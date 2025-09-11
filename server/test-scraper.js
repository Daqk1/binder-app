const PokemonCardScraper = require('./scraper');

async function testScraper() {
    console.log('🧪 Testing Pokemon Card Scraper...');
    
    const scraper = new PokemonCardScraper();
    
    try {
        // Initialize scraper
        console.log('📋 Initializing scraper...');
        await scraper.init();
        console.log('✅ Scraper initialized successfully');
        
        // Test scraping a small set (promo has fewer cards)
        console.log('🎯 Testing with promo set...');
        const cards = await scraper.scrapeSet('promo', false);
        
        console.log(`✅ Successfully scraped ${cards.length} cards from promo set`);
        
        if (cards.length > 0) {
            console.log('📄 Sample card:');
            console.log(JSON.stringify(cards[0], null, 2));
        }
        
        // Test Japanese set
        console.log('🎯 Testing with Japanese promo set...');
        const jpCards = await scraper.scrapeSet('japanese-promo', true);
        
        console.log(`✅ Successfully scraped ${jpCards.length} cards from Japanese promo set`);
        
    } catch (error) {
        console.error('❌ Test failed:', error);
    } finally {
        // Clean up
        console.log('🧹 Closing scraper...');
        await scraper.close();
        console.log('✅ Test completed');
    }
}

// Run the test
testScraper().catch(console.error);
