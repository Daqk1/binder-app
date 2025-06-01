const express = require("express");
const fs = require("fs");
const path = require("path");
const cors = require("cors");

const app = express();
const PORT = 5000;

app.use(cors());

app.get("/api/cards", (req, res) => {
  const setName = req.query.setName;
  const cardName = req.query.cardName || "";

  const dataDir = path.join(__dirname, "pokemon_data");

  const loadFiles = setName
    ? [path.join(dataDir, `${setName}.json`)]
    : fs.readdirSync(dataDir)
        .filter(file => file.endsWith(".json"))
        .map(file => path.join(dataDir, file));

  try {
    let allCards = [];
    console.log("Loading files:", loadFiles);

    for (const file of loadFiles) {
      try {
        const rawData = fs.readFileSync(file, "utf-8");
        const json = JSON.parse(rawData);

        if (!Array.isArray(json)) {
          throw new Error(`Invalid format in ${file}: expected an array`);
        }

        allCards.push(...json);
      } catch (innerErr) {
        console.error(`❌ Failed to read or parse ${file}:`, innerErr.message);
        throw innerErr; // Stop everything if even one file fails
      }
    }

    const filtered = allCards.filter(card => {
      const name = card.cardName || "";
      return name.toLowerCase().includes(cardName.toLowerCase());
    });

    res.json(filtered);
  } catch (err) {
    console.error("🔥 Server Error:", err.message);
    res.status(500).send(`Server Error: ${err.message}`);
  }
});

app.listen(PORT, () => {
  console.log(`✅ Server is running on http://localhost:${PORT}`);
});
