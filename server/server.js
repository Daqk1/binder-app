const express = require("express");
const fs = require("fs");
const path = require("path");
const cors = require("cors");

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

const dataDir = path.join(__dirname, "pokemon_data");
const userDataDir = path.join(__dirname, "user_data");

if (!fs.existsSync(userDataDir)) fs.mkdirSync(userDataDir);

const sets = [
  "base-set", "jungle", "fossil", "base-set-2", "team-rocket",
  "gym-heroes", "gym-challenge", "neo-genesis", "neo-discovery",
  "neo-revelation", "neo-destiny", "legendary-collection",
  "expedition", "aquapolis", "skyridge", "ruby-&-sapphire",
  "sandstorm", "dragon", "team-magma-&-team-aqua", "hidden-legends",
  "fire-red-&-leaf-green", "team-rocket-returns", "deoxys", "emerald",
  "unseen-forces", "delta-species", "legend-maker", "holon-phantoms",
  "crystal-guardians", "dragon-frontiers", "power-keepers",
  "diamond-&-pearl", "mysterious-treasures", "secret-wonders",
  "great-encounters", "majestic-dawn", "legends-awakened", "stormfront",
  "platinum", "rising-rivals", "supreme-victors", "arceus",
  "heartgold-&-soulsilver", "unleashed", "undaunted", "triumphant",
  "call-of-legends", "black-&-white", "emerging-powers",
  "noble-victories", "next-destinies", "dark-explorers",
  "dragons-exalted", "boundaries-crossed", "plasma-storm",
  "plasma-freeze", "plasma-blast", "legendary-treasures", "xy",
  "flashfire", "furious-fists", "phantom-forces", "primal-clash",
  "roaring-skies", "ancient-origins", "breakthrough", "breakpoint",
  "generations", "fates-collide", "steam-siege", "evolutions",
  "sun-&-moon", "guardians-rising", "burning-shadows",
  "shining-legends", "crimson-invasion", "ultra-prism",
  "forbidden-light", "celestial-storm", "dragon-majesty",
  "lost-thunder", "team-up", "detective-pikachu", "unbroken-bonds",
  "unified-minds", "hidden-fates", "cosmic-eclipse", "sword-&-shield",
  "rebel-clash", "darkness-ablaze", "champion-27s-path",
  "vivid-voltage", "shining-fates", "battle-styles", "chilling-reign",
  "evolving-skies", "celebrations", "fusion-strike", "brilliant-stars",
  "astral-radiance", "go", "lost-origin", "silver-tempest",
  "crown-zenith", "scarlet-&-violet", "paldea-evolved",
  "obsidian-flames", "paradox-rift", "scarlet-&-violet-151", "paldean-fates", "temporal-forces",
  "twilight-masquerade", "shrouded-fable", "stellar-crown", "surging-sparks",
  "prismatic-evolutions", "journey-together"
];

const cardCache = {};
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
  const { setName, cardName } = req.query;
  console.log("Query params:", { setName, cardName });

  if (!setName && !cardName) {
    return res.json([]);
  }

  let allCards = [];

  if (setName) {
    if (!sets.includes(setName)) {
      return res.status(404).json({ error: `Unknown set "${setName}".` });
    }
    allCards = cardCache[setName] || [];
  } else if (cardName) {
    allCards = Object.values(cardCache).flat();
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




app.get("/api/cards/user", (req, res) => {
  const { userId } = req.query;
  if (!userId) return res.status(400).json({ error: "Missing userId" });

  const data = readUserData(userId);
  res.json(data);
});

app.post("/api/cards/update", (req, res) => {
  const { userId, cardName, cardPrice, cardUrl, cardPicture, cardId, count } = req.body;

  if (!userId || !cardId || typeof count !== 'number') {
    return res.status(400).json({ error: "Missing userId, cardId, or count" });
  }

  const userCards = readUserData(userId);

  if (count > 0) {
    userCards[cardId] = {
      cardName,
      cardPrice,
      cardUrl,
      cardPicture,
      count
    };
  } else {
    delete userCards[cardId];
  }

  writeUserData(userId, userCards);

  res.json({ message: "User card data updated successfully", userCards });
});




app.listen(PORT, () => console.log(`✅ Server is running on http://localhost:${PORT}`));
