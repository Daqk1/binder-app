const puppeteer = require('puppeteer');
const fs = require('fs').promises;
const path = require('path');

class PokemonCardScraper {
    constructor() {
        this.browser = null;
        this.dataDir = path.join(__dirname, 'pokemon_data');
        this.jpDataDir = path.join(__dirname, 'jppokemon_data');
        this.globalCardId = 0;
    }

    async init() {
        // Ensure data directories exist
        await this.ensureDirectories();
        
        // Launch browser
        this.browser = await puppeteer.launch({
            headless: true,
            args: [
                '--no-sandbox',
                '--disable-setuid-sandbox',
                '--disable-dev-shm-usage',
                '--disable-gpu',
                '--window-size=1920,1080'
            ]
        });
    }

    async ensureDirectories() {
        try {
            await fs.mkdir(this.dataDir, { recursive: true });
            await fs.mkdir(this.jpDataDir, { recursive: true });
        } catch (error) {
            console.log('Directories already exist or created successfully');
        }
    }

    async scrapeSet(setName, isJapanese = false) {
        console.log(`Starting to scrape set: ${setName}`);
        
        const page = await this.browser.newPage();
        try {
            const url = this.buildSetURL(setName, isJapanese);
            console.log(`Loading URL: ${url}`);
            
            await page.goto(url, { waitUntil: 'networkidle2', timeout: 30000 });
            
            // Sort by card number
            await this.sortByCardNumber(page);
            
            // Load all cards with dynamic scrolling
            const cardUrls = await this.loadAllCards(page);
            console.log(`Found ${cardUrls.length} cards in ${setName}`);
            
            // Scrape individual card data
            const cards = await this.scrapeCardData(cardUrls, setName);
            
            // Save to file
            await this.saveCardData(cards, setName, isJapanese);
            
            console.log(`Completed scraping ${setName}: ${cards.length} cards`);
            return cards;
            
        } catch (error) {
            console.error(`Error scraping set ${setName}:`, error.message);
            return [];
        } finally {
            await page.close();
        }
    }

    buildSetURL(setName, isJapanese) {
        if (isJapanese) {
            return `https://www.pricecharting.com/console/pokemon-${setName}?sort=model-number`;
        }
        return `https://www.pricecharting.com/console/pokemon-${setName}?sort=model-number`;
    }

    async sortByCardNumber(page) {
        try {
            await page.waitForSelector('#sortForm', { timeout: 10000 });
            await page.select('#sortForm', 'model-number');
            await page.waitForTimeout(2000); // Wait for page to reload
        } catch (error) {
            console.log('Could not sort by card number, continuing...');
        }
    }

    async loadAllCards(page) {
        const cardUrls = [];
        let lastItemCount = 0;
        let stableCount = 0;
        const maxIterations = 300;
        let iteration = 0;

        console.log('Starting dynamic content loading...');

        // Get initial count
        lastItemCount = await this.getCurrentItemCount(page);
        console.log(`Initial item count: ${lastItemCount}`);

        while (stableCount < 10 && iteration < maxIterations) {
            iteration++;

            // Scroll to bottom multiple times
            await page.evaluate(() => {
                window.scrollTo(0, document.body.scrollHeight);
            });
            await page.waitForTimeout(200);
            
            await page.evaluate(() => {
                window.scrollTo(0, document.body.scrollHeight);
            });
            await page.waitForTimeout(200);
            
            await page.evaluate(() => {
                window.scrollTo(0, document.body.scrollHeight);
            });

            // Wait for content to load
            await page.waitForTimeout(1500);

            // Count current items
            const currentItemCount = await this.getCurrentItemCount(page);

            if (currentItemCount > lastItemCount) {
                stableCount = 0;
                const newItems = currentItemCount - lastItemCount;
                lastItemCount = currentItemCount;
                console.log(`Iteration ${iteration}: Found ${currentItemCount} items (loaded ${newItems} new items)`);
            } else {
                stableCount++;
                console.log(`Iteration ${iteration}: No new items loaded (stable count: ${stableCount}/10)`);
            }

            await page.waitForTimeout(500);
        }

        if (stableCount >= 10) {
            console.log(`Scrolling completed! Final item count: ${lastItemCount}`);
        } else {
            console.log(`Reached maximum iterations (${maxIterations}). Final item count: ${lastItemCount}`);
        }

        // Extract card URLs
        const urls = await page.evaluate(() => {
            const links = document.querySelectorAll('tbody .title a');
            return Array.from(links).map(link => 'https://www.pricecharting.com' + link.getAttribute('href'));
        });

        return urls;
    }

    async getCurrentItemCount(page) {
        try {
            return await page.evaluate(() => {
                const tbody = document.querySelector('tbody');
                if (tbody) {
                    return tbody.querySelectorAll('tr').length;
                }
                return 0;
            });
        } catch (error) {
            console.log('Error counting items:', error.message);
            return 0;
        }
    }

    async scrapeCardData(cardUrls, setName) {
        const cards = [];
        const batchSize = 10; // Process 10 cards at a time
        
        for (let i = 0; i < cardUrls.length; i += batchSize) {
            const batch = cardUrls.slice(i, i + batchSize);
            const batchPromises = batch.map(url => this.scrapeSingleCard(url, setName));
            
            try {
                const batchResults = await Promise.all(batchPromises);
                cards.push(...batchResults.filter(card => card !== null));
                
                // Add delay between batches to avoid rate limiting
                if (i + batchSize < cardUrls.length) {
                    await new Promise(resolve => setTimeout(resolve, 1000));
                }
            } catch (error) {
                console.error(`Error processing batch starting at ${i}:`, error.message);
            }
        }

        return cards;
    }

    async scrapeSingleCard(url, setName) {
        const page = await this.browser.newPage();
        try {
            await page.goto(url, { waitUntil: 'networkidle2', timeout: 15000 });
            
            // Extract card data
            const cardData = await page.evaluate(() => {
                // Extract name
                let name = '';
                const chartTitle = document.querySelector('.chart_title h1');
                if (chartTitle) {
                    const link = chartTitle.querySelector('a');
                    if (link) link.remove();
                    name = chartTitle.textContent.trim();
                }

                // Extract price
                let price = 0.00;
                const priceElement = document.querySelector('.price.js-price');
                if (priceElement) {
                    const priceText = priceElement.textContent.trim();
                    if (priceText !== '-') {
                        const cleanPrice = priceText.replace('$', '').replace(',', '');
                        price = parseFloat(cleanPrice) || 0.00;
                    }
                }

                // Extract picture
                let picture = 'No picture available';
                const images = document.querySelectorAll('img[alt]');
                for (const img of images) {
                    if (img.alt && img.alt.includes(name)) {
                        picture = img.src;
                        break;
                    }
                }

                return { name, price, picture };
            });

            if (cardData.name) {
                const cardId = `${setName}_${this.globalCardId++}`;
                const card = {
                    cardName: cardData.name,
                    cardPrice: cardData.price,
                    cardUrl: url,
                    cardPicture: cardData.picture,
                    cardId: cardId,
                    cardNumberOfCards: 0
                };

                console.log(`Fetched: ${cardData.name} | $${cardData.price} | ${cardId}`);
                return card;
            }

            return null;
        } catch (error) {
            console.error(`Error fetching card at ${url}:`, error.message);
            return null;
        } finally {
            await page.close();
        }
    }

    async saveCardData(cards, setName, isJapanese) {
        const cleanSetName = this.cleanSetNameForFile(setName);
        const dataDir = isJapanese ? this.jpDataDir : this.dataDir;
        const filePath = path.join(dataDir, `${cleanSetName}.json`);
        
        try {
            await fs.writeFile(filePath, JSON.stringify(cards, null, 2));
            console.log(`Card data saved to ${filePath}`);
        } catch (error) {
            console.error(`Error saving data to file: ${error.message}`);
        }
    }

    cleanSetNameForFile(setName) {
        if (!setName) return 'unknown-set';
        
        let cleaned = setName;
        
        // Handle special cases
        if (cleaned === "champion%27s-path") {
            cleaned = "champion-27s-path";
        }
        
        // Replace & with and
        cleaned = cleaned.replace('&', 'and');
        
        return cleaned;
    }

    async scrapeAllSets() {
        const englishSets = [
            "prismatic-evolutions",
            "journey-together", 
            "destined-rivals",
            "black-bolt",
            "white-flare",
            "promo"
        ];

        const japaneseSets = [
            "japanese-terastal-festival"
        ];

        console.log('Starting to scrape all sets...');
        
        // Scrape English sets
        for (const setName of englishSets) {
            await this.scrapeSet(setName, false);
            await new Promise(resolve => setTimeout(resolve, 2000)); // Delay between sets
        }

        // Scrape Japanese sets
        for (const setName of japaneseSets) {
            await this.scrapeSet(setName, true);
            await new Promise(resolve => setTimeout(resolve, 2000)); // Delay between sets
        }

        console.log('Completed scraping all sets');
    }

    async close() {
        if (this.browser) {
            await this.browser.close();
        }
    }
}

module.exports = PokemonCardScraper;
