const express = require("express");
const fs = require("fs");
const path = require("path");
const cors = require("cors");
require('dotenv').config();
const mongoose = require('mongoose');
const User = require('./user.model');
const chokidar = require('chokidar');
const JavaScraperWrapper = require('./java-scraper-wrapper');

const app = express();
const PORT = 8000;

const MONGODB_URI = process.env.MONGODB_URI;

mongoose.connect(MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('✅ Connected to MongoDB'))
.catch((err) => {
  console.error('❌ MongoDB connection error:', err);
  process.exit(1);
});

app.use(cors());
app.use(express.json());

const dataDir = path.join(__dirname, "pokemon_data");
const jpDataDir = path.join(__dirname, "jppokemon_data");
const userDataDir = path.join(__dirname, "user_data");

if (!fs.existsSync(userDataDir)) fs.mkdirSync(userDataDir);

const sets = [
  "base-set", "jungle", "fossil", "base-set-2", "team-rocket",
  "gym-heroes", "gym-challenge", "neo-genesis", "neo-discovery",
  "neo-revelation", "neo-destiny", "legendary-collection",
  "expedition", "aquapolis", "skyridge", "ruby-&-sapphire",
  "sandstorm", "dragon", "team-magma-and-team-aqua", "hidden-legends",
  "fire-red-and-leaf-green", "team-rocket-returns", "deoxys", "emerald",
  "unseen-forces", "delta-species", "legend-maker", "holon-phantoms",
  "crystal-guardians", "dragon-frontiers", "power-keepers",
  "diamond-and-pearl", "mysterious-treasures", "secret-wonders",
  "great-encounters", "majestic-dawn", "legends-awakened", "stormfront",
  "platinum", "rising-rivals", "supreme-victors", "arceus",
  "heartgold-and-soulsilver", "unleashed", "undaunted", "triumphant",
  "call-of-legends", "black-and-white", "emerging-powers",
  "noble-victories", "next-destinies", "dark-explorers",
  "dragons-exalted", "boundaries-crossed", "plasma-storm",
  "plasma-freeze", "plasma-blast", "legendary-treasures", "xy",
  "flashfire", "furious-fists", "phantom-forces", "primal-clash",
  "roaring-skies", "ancient-origins", "breakthrough", "breakpoint",
  "generations", "fates-collide", "steam-siege", "evolutions",
  "sun-and-moon", "guardians-rising", "burning-shadows",
  "shining-legends", "crimson-invasion", "ultra-prism",
  "forbidden-light", "celestial-storm", "dragon-majesty",
  "lost-thunder", "team-up", "detective-pikachu", "unbroken-bonds",
  "unified-minds", "hidden-fates", "cosmic-eclipse", "sword-and-shield",
  "rebel-clash", "darkness-ablaze", "champion-27s-path",
  "vivid-voltage", "shining-fates", "battle-styles", "chilling-reign",
  "evolving-skies", "celebrations", "fusion-strike", "brilliant-stars",
  "astral-radiance", "go", "lost-origin", "silver-tempest",
  "crown-zenith", "scarlet-and-violet", "paldea-evolved",
  "obsidian-flames", "paradox-rift", "scarlet-and-violet-151", "paldean-fates", "temporal-forces",
  "twilight-masquerade", "shrouded-fable", "stellar-crown", "surging-sparks",
  "prismatic-evolutions", "journey-together",  "destined-rivals", "white-flare", "black-bolt", "promo"
];

const japaneseSets = [
  "japanese-promo", "japanese-expansion-pack", "japanese-jungle", "japanese-mystery-of-the-fossils",
  "japanese-glory-of-team-rocket", "japanese-leaders%27-stadium", "japanese-challenge-from-the-darkness",
  "japanese-gold-silver-new-world", "japanese-crossing-the-ruins", "japanese-awakening-legends",
  "japanese-darkness-and-to-light", "japanese-vs", "japanese-web", "japanese-the-town-on-no-map",
  "japanese-wind-from-the-sea", "japanese-split-earth", "japanese-mysterious-mountains",
  "japanese-miracle-of-the-desert", "japanese-rulers-of-the-heavens", "japanese-undone-seal",
  "japanese-flight-of-legends", "japanese-clash-of-the-blue-sky", "japanese-rocket-gang-strikes-back",
  "japanese-golden-sky-silvery-ocean", "japanese-mirage-forest", "japanese-holon-research",
  "japanese-holon-phantom", "japanese-miracle-crystal", "japanese-offense-and-defense-of-the-furthest-ends",
  "japanese-world-champions-pack", "japanese-space-time", "japanese-secret-of-the-lakes",
  "japanese-shining-darkness", "japanese-moonlit-pursuit", "japanese-cry-from-the-mysterious",
  "japanese-temple-of-anger", "japanese-dawn-dash", "japanese-intense-fight-in-the-destroyed-sky",
  "japanese-galactic%27s-conquest", "japanese-bonds-to-the-end-of-time", "japanese-beat-of-the-frontier",
  "japanese-advent-of-arceus", "japanese-soulsilver-collection", "japanese-reviving-legends",
  "japanese-clash-at-the-summit", "japanese-sword", "japanese-shield", "japanese-vmax-rising",
  "japanese-rebel-clash", "japanese-explosive-walker", "japanese-infinity-zone",
  "japanese-legendary-heartbeat", "japanese-amazing-volt-tackle", "japanese-shiny-star-v",
  "japanese-single-strike-master", "japanese-rapid-strike-master", "japanese-matchless-fighter",
  "japanese-silver-lance", "japanese-jet-black-spirit", "japanese-eevee-heroes",
  "japanese-skyscraping-perfection", "japanese-blue-sky-stream", "japanese-fusion-arts",
  "japanese-25th-anniversary-collection", "japanese-vmax-climax", "japanese-star-birth",
  "japanese-battle-region", "japanese-time-gazer", "japanese-space-juggler",
  "japanese-dark-phantasma", "japanese-go", "japanese-lost-abyss", "japanese-incandescent-arcana",
  "japanese-paradigm-trigger", "japanese-vstar-universe", "japanese-scarlet-ex",
  "japanese-violet-ex", "japanese-triplet-beat", "japanese-snow-hazard", "japanese-clay-burst",
  "japanese-scarlet-and-violet-151", "japanese-ruler-of-the-black-flame", "japanese-raging-surf",
  "japanese-ancient-roar", "japanese-future-flash", "japanese-mega-brave", "japanese-mega-symphonia",
  "japanese-shiny-treasure-ex", "japanese-battle-partners", "japanese-night-wanderer", "japanese-terastal-festival"
];

const cardCache = {};
// Load English sets
sets.forEach(set => {
  const filePath = path.join(dataDir, `${set}.json`);
  if (fs.existsSync(filePath)) {
    try {
      const data = fs.readFileSync(filePath, "utf-8");
      const json = JSON.parse(data);
      if (Array.isArray(json)) {
        cardCache[set] = json;
      } else {
        console.warn(`⚠️ ${set}.json is not an array`);
      }
    } catch (err) {
      console.error(`❌ Error reading ${set}.json:`, err.message);
    }
  }
});

// Load Japanese sets
japaneseSets.forEach(set => {
  const filePath = path.join(jpDataDir, `${set}.json`);
  if (fs.existsSync(filePath)) {
    try {
      const data = fs.readFileSync(filePath, "utf-8");
      const json = JSON.parse(data);
      if (Array.isArray(json)) {
        cardCache[set] = json;
      } else {
        console.warn(`⚠️ ${set}.json is not an array`);
      }
    } catch (err) {
      console.error(`❌ Error reading ${set}.json:`, err.message);
    }
  }
});

const getUserFilePath = (userId) => path.join(userDataDir, `user_${userId}_cards.json`);

const readUserData = (userId) => {
  const filePath = getUserFilePath(userId);
  if (fs.existsSync(filePath)) {
    try {
      return JSON.parse(fs.readFileSync(filePath, "utf-8"));
    } catch {
      return {};
    }
  }
  return {};
};

const writeUserData = (userId, data) => {
  const filePath = getUserFilePath(userId);
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
};

app.get("/api/cards", (req, res) => {
  const { setName, cardName, searchType } = req.query;
  console.log("Query params:", { setName, cardName, searchType });

  if (!setName && !cardName) {
    return res.json([]);
  }

  let allCards = [];

  if (setName) {
    if (!sets.includes(setName) && !japaneseSets.includes(setName)) {
      return res.status(404).json({ error: `Unknown set "${setName}".` });
    }
    allCards = cardCache[setName] || [];
  } else if (cardName) {
    // Search specific type of sets based on searchType parameter
    if (searchType === "japanese") {
      allCards = japaneseSets.flatMap(set => cardCache[set] || []);
    } else if (searchType === "english") {
      allCards = sets.flatMap(set => cardCache[set] || []);
    } else {
      // Default: search all sets (backward compatibility)
      allCards = Object.values(cardCache).flat();
    }
  }

  console.log(`Filtering ${allCards.length} cards by cardName:`, cardName);

  const filtered = cardName
    ? allCards.filter(card =>
        card.cardName?.toLowerCase().includes(cardName.toLowerCase())
      )
    : allCards;

  console.log(`Returning ${filtered.length} filtered cards`);

  res.json(filtered);
});

app.get("/api/cards/user", async (req, res) => {
  const { userId } = req.query;
  if (!userId) return res.status(400).json({ error: "Missing userId" });

  try {
    let user = await User.findOne({ userId });
    if (!user) {
      user = new User({ userId, collection: {} });
      await user.save();
    }
    res.json(Object.fromEntries(user.collection));
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch user data" });
  }
});

app.post("/api/cards/update", async (req, res) => {
  const { userId, cardName, cardPrice, cardUrl, cardPicture, cardId, count } = req.body;

  if (!userId || !cardId || typeof count !== 'number') {
    return res.status(400).json({ error: "Missing userId, cardId, or count" });
  }

  try {
    let user = await User.findOne({ userId });
    if (!user) {
      user = new User({ userId, collection: {} });
    }
    console.log('[Update Debug] userId:', userId, 'cardId:', cardId, 'count:', count);
    console.log('[Update Debug] user.collection before:', user.collection);
    if (count > 0) {
      user.collection.set(cardId, { cardId, cardName, cardPrice, cardUrl, cardPicture, count });
    } else {
      user.collection.delete(cardId);
    }
    await user.save();
    console.log('[Update Debug] user.collection after:', user.collection);
    res.json({ message: "User card data updated successfully", userCards: Object.fromEntries(user.collection) });
  } catch (err) {
    console.error('[Update Debug] Error updating user:', err);
    res.status(500).json({ error: "Failed to update user data" });
  }
});

app.delete("/api/cards/user", async (req, res) => {
  const { userId } = req.query;
  if (!userId) return res.status(400).json({ error: "Missing userId" });

  try {
    const result = await User.deleteOne({ userId });
    if (result.deletedCount > 0) {
      res.json({ message: "User deleted successfully" });
    } else {
      res.status(404).json({ error: "User not found" });
    }
  } catch (err) {
    res.status(500).json({ error: "Failed to delete user" });
  }
});


app.get('/', (req, res) => {
  res.send('API server is running.');
});

// Serve admin interface
app.get('/admin', (req, res) => {
  res.sendFile(path.join(__dirname, 'admin.html'));
});

// Function to perform sync (extracted for reuse)
const performSync = async () => {
  try {
    console.log('🔄 Starting Pokemon data sync to user collections...');
    
    // Create backup of all user data before sync
    const users = await User.find({});
    const backupData = {};
    for (const user of users) {
      backupData[user.userId] = {
        collection: new Map(user.collection),
        timestamp: new Date().toISOString()
      };
    }
    
    // Save backup to file
    const backupPath = path.join(__dirname, 'backup', `sync_backup_${Date.now()}.json`);
    if (!fs.existsSync(path.dirname(backupPath))) {
      fs.mkdirSync(path.dirname(backupPath), { recursive: true });
    }
    fs.writeFileSync(backupPath, JSON.stringify(backupData, null, 2));
    console.log(`💾 Backup created: ${backupPath}`);
    
    // Reload all Pokemon data from JSON files
    const newCardCache = {};
    
    // Reload English sets
    sets.forEach(set => {
      const filePath = path.join(dataDir, `${set}.json`);
      if (fs.existsSync(filePath)) {
        try {
          const data = fs.readFileSync(filePath, "utf-8");
          const json = JSON.parse(data);
          if (Array.isArray(json)) {
            newCardCache[set] = json;
          }
        } catch (err) {
          console.error(`❌ Error reading ${set}.json:`, err.message);
        }
      }
    });
    
    // Reload Japanese sets
    japaneseSets.forEach(set => {
      const filePath = path.join(jpDataDir, `${set}.json`);
      if (fs.existsSync(filePath)) {
        try {
          const data = fs.readFileSync(filePath, "utf-8");
          const json = JSON.parse(data);
          if (Array.isArray(json)) {
            newCardCache[set] = json;
          }
        } catch (err) {
          console.error(`❌ Error reading ${set}.json:`, err.message);
        }
      }
    });
    
    // Create a map of all cards by their cardId for quick lookup
    const allCards = Object.values(newCardCache).flat();
    const cardDataMap = new Map();
    
    // Build map using the cardId directly (it already includes set name)
    allCards.forEach(card => {
      if (card.cardId) {
        cardDataMap.set(card.cardId, {
          cardId: card.cardId,
          cardName: card.cardName,
          cardPrice: card.cardPrice,
          cardUrl: card.cardUrl,
          cardPicture: card.cardPicture
        });
      }
    });
    
    console.log(`📊 Master data loaded: ${allCards.length} cards, ${cardDataMap.size} unique cardIds`);
    
    // Update the in-memory cache
    Object.keys(cardCache).forEach(key => delete cardCache[key]);
    Object.assign(cardCache, newCardCache);
    
    let updatedUsers = 0;
    let totalCardsUpdated = 0;
    let totalCardsPreserved = 0;
    
    for (const user of users) {
      let userUpdated = false;
      const updatedCollection = new Map();
      const userCardIds = Array.from(user.collection.keys());
      
      console.log(`👤 Processing user ${user.userId} with ${userCardIds.length} cards`);
      
      // Update each card in user's collection with latest data
      for (const [cardId, userCard] of user.collection) {
        const latestCardData = cardDataMap.get(cardId);
        
        if (latestCardData) {
          // Update with latest data while preserving the count
          updatedCollection.set(cardId, {
            ...latestCardData,
            count: userCard.count
          });
          
          // Check if any data actually changed
          if (userCard.cardName !== latestCardData.cardName ||
              userCard.cardPrice !== latestCardData.cardPrice ||
              userCard.cardUrl !== latestCardData.cardUrl ||
              userCard.cardPicture !== latestCardData.cardPicture) {
            userUpdated = true;
            totalCardsUpdated++;
            console.log(`  🔄 Updated: ${cardId} - ${userCard.cardName} -> ${latestCardData.cardName}`);
          } else {
            totalCardsPreserved++;
          }
        } else {
          // Card no longer exists in master data, but keep it for now
          updatedCollection.set(cardId, userCard);
          console.log(`  ⚠️  Card not found in master data: ${cardId} - ${userCard.cardName}`);
        }
      }
      
      if (userUpdated) {
        user.collection = updatedCollection;
        await user.save();
        updatedUsers++;
      }
    }
    
    console.log(`✅ Sync completed: ${updatedUsers} users updated, ${totalCardsUpdated} cards updated, ${totalCardsPreserved} cards preserved`);
    return { 
      usersUpdated: updatedUsers, 
      cardsUpdated: totalCardsUpdated, 
      cardsPreserved: totalCardsPreserved,
      totalCardsInMaster: allCards.length,
      backupPath: backupPath
    };
    
  } catch (err) {
    console.error('❌ Error during sync:', err);
    throw err;
  }
};

// Set up file watchers for automatic sync
const setupFileWatchers = () => {
  // Watch English Pokemon data files
  const englishWatcher = chokidar.watch(path.join(dataDir, '*.json'), {
    ignored: /(^|[\/\\])\../, // ignore dotfiles
    persistent: true,
    ignoreInitial: true
  });

  // Watch Japanese Pokemon data files
  const japaneseWatcher = chokidar.watch(path.join(jpDataDir, '*.json'), {
    ignored: /(^|[\/\\])\../, // ignore dotfiles
    persistent: true,
    ignoreInitial: true
  });

  let syncTimeout;
  const debouncedSync = () => {
    clearTimeout(syncTimeout);
    syncTimeout = setTimeout(async () => {
      try {
        await performSync();
      } catch (err) {
        console.error('❌ Auto-sync failed:', err);
      }
    }, 2000); // Wait 2 seconds after last file change
  };

  englishWatcher.on('change', (filePath) => {
    console.log(`📝 English Pokemon data file changed: ${path.basename(filePath)}`);
    debouncedSync();
  });

  japaneseWatcher.on('change', (filePath) => {
    console.log(`📝 Japanese Pokemon data file changed: ${path.basename(filePath)}`);
    debouncedSync();
  });

  console.log('👀 File watchers set up for automatic Pokemon data sync');
};

// Update the sync endpoint to use the extracted function
app.post("/api/cards/sync", async (req, res) => {
  try {
    const result = await performSync();
    res.json({ 
      message: "Pokemon data sync completed successfully",
      ...result
    });
  } catch (err) {
    res.status(500).json({ error: "Failed to sync Pokemon data" });
  }
});

// Restore from backup endpoint
app.post("/api/cards/restore", async (req, res) => {
  try {
    const { backupPath } = req.body;
    if (!backupPath) {
      return res.status(400).json({ error: "Backup path is required" });
    }

    if (!fs.existsSync(backupPath)) {
      return res.status(404).json({ error: "Backup file not found" });
    }

    console.log(`🔄 Restoring from backup: ${backupPath}`);
    const backupData = JSON.parse(fs.readFileSync(backupPath, "utf-8"));
    
    let restoredUsers = 0;
    for (const [userId, userData] of Object.entries(backupData)) {
      const user = await User.findOne({ userId });
      if (user) {
        // Convert the backup data back to Map format
        user.collection = new Map(Object.entries(userData.collection));
        await user.save();
        restoredUsers++;
        console.log(`✅ Restored user: ${userId} with ${user.collection.size} cards`);
      }
    }

    res.json({ 
      message: "Data restored successfully",
      restoredUsers: restoredUsers,
      backupPath: backupPath
    });
  } catch (err) {
    console.error('❌ Error during restore:', err);
    res.status(500).json({ error: "Failed to restore data" });
  }
});

// Scraper endpoints
let javaScraper = null;

// Initialize scraper
app.post("/api/scraper/init", async (req, res) => {
  try {
    if (!javaScraper) {
      javaScraper = new JavaScraperWrapper();
      console.log('✅ Java Scraper wrapper initialized');
    }
    
    // Check Java installation
    const javaInstalled = await javaScraper.checkJavaInstallation();
    if (!javaInstalled) {
      return res.status(500).json({ error: "Java is not installed or not in PATH" });
    }
    
    // Check dependencies
    const deps = await javaScraper.checkDependencies();
    if (!deps.allPresent) {
      return res.status(500).json({ 
        error: "Missing dependencies", 
        missing: deps.missing 
      });
    }
    
    res.json({ 
      message: "Java scraper initialized successfully",
      javaInstalled: true,
      dependenciesOk: true
    });
  } catch (error) {
    console.error('❌ Error initializing Java scraper:', error);
    res.status(500).json({ error: "Failed to initialize Java scraper" });
  }
});

// Scrape specific set
app.post("/api/scraper/set", async (req, res) => {
  const { setName, isJapanese } = req.body;
  
  if (!setName) {
    return res.status(400).json({ error: "setName is required" });
  }

  if (!javaScraper) {
    return res.status(400).json({ error: "Java scraper not initialized" });
  }

  const status = javaScraper.getStatus();
  if (status.isRunning) {
    return res.status(409).json({ error: "Java scraper is already running" });
  }

  try {
    console.log(`🔄 Starting Java scraper for set: ${setName}`);
    
    const result = await javaScraper.scrapeSet(setName, isJapanese || false);
    
    res.json({ 
      message: `Successfully scraped ${setName} using Java scraper`,
      setName: setName,
      isJapanese: isJapanese || false,
      success: result.success
    });
  } catch (error) {
    console.error(`❌ Error scraping set ${setName}:`, error);
    res.status(500).json({ error: `Failed to scrape set ${setName}: ${error.message}` });
  }
});

// Scrape all sets
app.post("/api/scraper/all", async (req, res) => {
  if (!javaScraper) {
    return res.status(400).json({ error: "Java scraper not initialized" });
  }

  const status = javaScraper.getStatus();
  if (status.isRunning) {
    return res.status(409).json({ error: "Java scraper is already running" });
  }

  try {
    console.log('🔄 Starting Java scraper for all sets...');
    
    const result = await javaScraper.scrapeAllSets();
    
    res.json({ 
      message: "Successfully scraped all sets using Java scraper",
      timestamp: new Date().toISOString(),
      success: result.success
    });
  } catch (error) {
    console.error('❌ Error scraping all sets:', error);
    res.status(500).json({ error: `Failed to scrape all sets: ${error.message}` });
  }
});

// Get scraping status
app.get("/api/scraper/status", (req, res) => {
  if (!javaScraper) {
    return res.json({
      isScraping: false,
      isInitialized: false,
      type: 'java',
      timestamp: new Date().toISOString()
    });
  }
  
  const status = javaScraper.getStatus();
  res.json({
    isScraping: status.isRunning,
    isInitialized: true,
    type: 'java',
    timestamp: new Date().toISOString()
  });
});

// Get available sets
app.get("/api/scraper/sets", (req, res) => {
  const { type } = req.query; // 'english', 'japanese', or 'all'
  
  let availableSets = [];
  
  if (type === 'english' || type === 'all') {
    availableSets = availableSets.concat(sets.map(set => ({ name: set, type: 'english' })));
  }
  
  if (type === 'japanese' || type === 'all') {
    availableSets = availableSets.concat(japaneseSets.map(set => ({ name: set, type: 'japanese' })));
  }
  
  res.json({
    sets: availableSets,
    total: availableSets.length,
    englishCount: sets.length,
    japaneseCount: japaneseSets.length
  });
});

// Close scraper
app.post("/api/scraper/close", async (req, res) => {
  try {
    if (javaScraper) {
      // Java scraper doesn't need explicit closing, just reset the reference
      javaScraper = null;
      console.log('✅ Java scraper wrapper closed');
    }
    res.json({ message: "Java scraper closed successfully" });
  } catch (error) {
    console.error('❌ Error closing Java scraper:', error);
    res.status(500).json({ error: "Failed to close Java scraper" });
  }
});

app.listen(PORT, () => {
  console.log(`✅ Server is running on http://localhost:${PORT}`);
  setupFileWatchers();
});