import React, { Component } from 'react';

class SetList extends Component {
    state = {
        set: [
            { value: "ancient-origins", id: "Ancient Origins" },
            { value: "aquapolis", id: "Aquapolis" },
            { value: "arceus", id: "Arceus" },
            { value: "astral-radiance", id: "Astral Radiance" },
            { value: "base-set", id: "Base Set" },
            { value: "base-set-2", id: "Base Set 2" },
            { value: "battle-styles", id: "Battle Styles" },
            { value: "black-and-white", id: "Black & White" },
            { value: "black-bolt", id: "Black Bolt" },
            { value: "boundaries-crossed", id: "Boundaries Crossed" },
            { value: "breakpoint", id: "Breakpoint" },
            { value: "breakthrough", id: "Breakthrough" },
            { value: "brilliant-stars", id: "Brilliant Stars" },
            { value: "burning-shadows", id: "Burning Shadows" },
            { value: "call-of-legends", id: "Call of Legends" },
            { value: "celebrations", id: "Celebrations" },
            { value: "celestial-storm", id: "Celestial Storm" },
            { value: "champion-27s-path", id: "Champion's Path" },
            { value: "chilling-reign", id: "Chilling Reign" },
            { value: "cosmic-eclipse", id: "Cosmic Eclipse" },
            { value: "crimson-invasion", id: "Crimson Invasion" },
            { value: "crown-zenith", id: "Crown Zenith" },
            { value: "crystal-guardians", id: "Crystal Guardians" },
            { value: "dark-explorers", id: "Dark Explorers" },
            { value: "darkness-ablaze", id: "Darkness Ablaze" },
            { value: "deoxys", id: "Deoxys" },
            { value: "destined-rivals", id: "Destined Rivals" },
            { value: "detective-pikachu", id: "Detective Pikachu" },
            { value: "diamond-and-pearl", id: "Diamond & Pearl" },
            { value: "dragon", id: "Dragon" },
            { value: "dragon-frontiers", id: "Dragon Frontiers" },
            { value: "dragon-majesty", id: "Dragon Majesty" },
            { value: "dragons-exalted", id: "Dragons Exalted" },
            { value: "emerging-powers", id: "Emerging Powers" },
            { value: "emerald", id: "Emerald" },
            { value: "evolutions", id: "Evolutions" },
            { value: "evolving-skies", id: "Evolving Skies" },
            { value: "expedition", id: "Expedition" },
            { value: "fates-collide", id: "Fates Collide" },
            { value: "fire-red-and-leaf-green", id: "Fire Red & Leaf Green" },
            { value: "flashfire", id: "Flashfire" },
            { value: "forbidden-light", id: "Forbidden Light" },
            { value: "fossil", id: "Fossil" },
            { value: "fusion-strike", id: "Fusion Strike" },
            { value: "furious-fists", id: "Furious Fists" },
            { value: "generations", id: "Generations" },
            { value: "go", id: "Pokemon Go" },
            { value: "great-encounters", id: "Great Encounters" },
            { value: "guardians-rising", id: "Guardians Rising" },
            { value: "gym-challenge", id: "Gym Challenge" },
            { value: "gym-heroes", id: "Gym Heroes" },
            { value: "heartgold-and-soulsilver", id: "HeartGold & SoulSilver" },
            { value: "heartgold-soulsilver", id: "HeartGold SoulSilver" },
            { value: "hidden-fates", id: "Hidden Fates" },
            { value: "hidden-legends", id: "Hidden Legends" },
            { value: "holon-phantoms", id: "Holon Phantoms" },
            { value: "journey-together", id: "Journey Together" },
            { value: "jungle", id: "Jungle" },
            { value: "legend-maker", id: "Legend Maker" },
            { value: "legendary-collection", id: "Legendary Collection" },
            { value: "legendary-treasures", id: "Legendary Treasures" },
            { value: "legends-awakened", id: "Legends Awakened" },
            { value: "lost-origin", id: "Lost Origin" },
            { value: "lost-thunder", id: "Lost Thunder" },
            { value: "majestic-dawn", id: "Majestic Dawn" },
            { value: "mysterious-treasures", id: "Mysterious Treasures" },
            { value: "neo-destiny", id: "Neo Destiny" },
            { value: "neo-discovery", id: "Neo Discovery" },
            { value: "neo-genesis", id: "Neo Genesis" },
            { value: "neo-revelation", id: "Neo Revelation" },
            { value: "next-destinies", id: "Next Destinies" },
            { value: "noble-victories", id: "Noble Victories" },
            { value: "obsidian-flames", id: "Obsidian Flames" },
            { value: "paldea-evolved", id: "Paldea Evolved" },
            { value: "paldean-fates", id: "Paldean Fates" },
            { value: "paradox-rift", id: "Paradox Rift" },
            { value: "phantom-forces", id: "Phantom Forces" },
            { value: "plasma-blast", id: "Plasma Blast" },
            { value: "plasma-freeze", id: "Plasma Freeze" },
            { value: "plasma-storm", id: "Plasma Storm" },
            { value: "platinum", id: "Platinum" },
            { value: "power-keepers", id: "Power Keepers" },
            { value: "primal-clash", id: "Primal Clash" },
            { value: "prismatic-evolutions", id: "Prismatic Evolutions" },
            { value: "promo", id: "Promos" },
            { value: "rebel-clash", id: "Rebel Clash" },
            { value: "rising-rivals", id: "Rising Rivals" },
            { value: "roaring-skies", id: "Roaring Skies" },
            { value: "ruby-and-sapphire", id: "Ruby & Sapphire" },
            { value: "sandstorm", id: "Sandstorm" },
            { value: "scarlet-and-violet", id: "Scarlet & Violet" },
            { value: "scarlet-and-violet-151", id: "Pokemon 151" },
            { value: "secret-wonders", id: "Secret Wonders" },
            { value: "shining-fates", id: "Shining Fates" },
            { value: "shining-legends", id: "Shining Legends" },
            { value: "shrouded-fable", id: "Shrouded Fable" },
            { value: "silver-tempest", id: "Silver Tempest" },
            { value: "skyridge", id: "Skyridge" },
            { value: "steam-siege", id: "Steam Siege" },
            { value: "stellar-crown", id: "Stellar Crown" },
            { value: "stormfront", id: "Stormfront" },
            { value: "sun-and-moon", id: "Sun & Moon" },
            { value: "supreme-victors", id: "Supreme Victors" },
            { value: "surging-sparks", id: "Surging Sparks" },
            { value: "sword-and-shield", id: "Sword & Shield" },
            { value: "team-magma-and-team-aqua", id: "Team Magma & Team Aqua" },
            { value: "team-rocket", id: "Team Rocket" },
            { value: "team-rocket-returns", id: "Team Rocket Returns" },
            { value: "team-up", id: "Team Up" },
            { value: "temporal-forces", id: "Temporal Forces" },
            { value: "triumphant", id: "Triumphant" },
            { value: "twilight-masquerade", id: "Twilight Masquerade" },
            { value: "ultra-prism", id: "Ultra Prism" },
            { value: "unbroken-bonds", id: "Unbroken Bonds" },
            { value: "undaunted", id: "Undaunted" },
            { value: "unified-minds", id: "Unified Minds" },
            { value: "unleashed", id: "Unleashed" },
            { value: "unseen-forces", id: "Unseen Forces" },
            { value: "vivid-voltage", id: "Vivid Voltage" },
            { value: "white-flare", id: "White Flare" },
            { value: "xy", id: "XY" }
        ],
        japaneseSets: [
            { value: "japanese-promo", id: "Japanese Promo" },
            { value: "japanese-expansion-pack", id: "Japanese Expansion Pack" },
            { value: "japanese-jungle", id: "Japanese Jungle" },
            { value: "japanese-mystery-of-the-fossils", id: "Japanese Mystery of the Fossils" },
            { value: "japanese-glory-of-team-rocket", id: "Japanese Glory of Team Rocket" },
            { value: "japanese-leaders%27-stadium", id: "Japanese Leaders' Stadium" },
            { value: "japanese-challenge-from-the-darkness", id: "Japanese Challenge from the Darkness" },
            { value: "japanese-gold-silver-new-world", id: "Japanese Gold Silver New World" },
            { value: "japanese-crossing-the-ruins", id: "Japanese Crossing the Ruins" },
            { value: "japanese-awakening-legends", id: "Japanese Awakening Legends" },
            { value: "japanese-darkness-and-to-light", id: "Japanese Darkness and to Light" },
            { value: "japanese-vs", id: "Japanese VS" },
            { value:"japanese-web", id: "Japanese Web" },
            { value: "japanese-the-town-on-no-map", id: "Japanese The Town on No Map" },
            { value: "japanese-wind-from-the-sea", id: "Japanese Wind from the Sea" },
            { value: "japanese-split-earth", id: "Japanese Split Earth" },
            { value: "japanese-mysterious-mountains", id: "Japanese Mysterious Mountains" },
            { value: "japanese-miracle-of-the-desert", id: "Japanese Miracle of the Desert" },
            { value: "japanese-rulers-of-the-heavens", id: "Japanese Rulers of the Heavens" },
            { value: "japanese-undone-seal", id: "Japanese Undone Seal" },
            { value: "japanese-flight-of-legends", id: "Japanese Flight of Legends" },
            { value: "japanese-clash-of-the-blue-sky", id: "Japanese Clash of the Blue Sky" },
            { value: "japanese-rocket-gang-strikes-back", id: "Japanese Rocket Gang Strikes Back" },
            { value: "japanese-golden-sky-silvery-ocean", id: "Japanese Golden Sky Silvery Ocean" },
            { value: "japanese-mirage-forest", id: "Japanese Mirage Forest" },
            { value: "japanese-holon-research", id: "Japanese Holon Research" },
            { value: "japanese-holon-phantom", id: "Japanese Holon Phantom" },
            { value: "japanese-miracle-crystal", id: "Japanese Miracle Crystal" },
            { value: "japanese-offense-and-defense-of-the-furthest-ends", id: "Japanese Offense and Defense of the Furthest Ends" },
            { value: "japanese-world-champions-pack", id: "Japanese World Champions Pack" },
            { value: "japanese-space-time", id: "Japanese Space Time" },
            { value: "japanese-secret-of-the-lakes", id: "Japanese Secret of the Lakes" },
            { value: "japanese-shining-darkness", id: "Japanese Shining Darkness" },
            { value: "japanese-moonlit-pursuit", id: "Japanese Moonlit Pursuit" },
            { value: "japanese-cry-from-the-mysterious", id: "Japanese Cry from the Mysterious" },
            { value: "japanese-temple-of-anger", id: "Japanese Temple of Anger" },
            { value: "japanese-dawn-dash", id: "Japanese Dawn Dash" },
            { value: "japanese-intense-fight-in-the-destroyed-sky", id: "Japanese Intense Fight in the Destroyed Sky" },
            { value:  "japanese-galactic%27s-conquest", id: "Japanese Galactic's Conquest" },
            { value: "japanese-bonds-to-the-end-of-time", id: "Japanese Bonds to the End of Time" },
            { value: "japanese-beat-of-the-frontier", id: "Japanese Beat of the Frontier" },
            { value: "japanese-advent-of-arceus", id: "Japanese Advent of Arceus" },
            { value: "japanese-soulsilver-collection", id: "Japanese Soulsilver Collection" },
            { value: "japanese-reviving-legends", id: "Japanese Reviving Legends" },
            { value: "japanese-clash-at-the-summit", id: "Japanese Clash at the Summit" },
            { value: "japanese-sword", id: "Japanese Sword" },
            { value: "japanese-shield", id: "Japanese Shield" },
            { value: "japanese-vmax-rising", id: "Japanese Vmax Rising" },
            { value: "japanese-rebel-clash", id: "Japanese Rebel Clash" },
            { value: "japanese-explosive-walker", id: "Japanese Explosive Walker" },
            { value: "japanese-infinity-zone", id: "Japanese Infinity Zone" },
            { value: "japanese-legendary-heartbeat", id: "Japanese Legendary Heartbeat" },
            { value: "japanese-amazing-volt-tackle", id: "Japanese Amazing Volt Tackle" },
            { value: "japanese-shiny-star-v", id: "Japanese Shiny Star V" },
            { value: "japanese-single-strike-master", id: "Japanese Single Strike Master" },
            { value: "japanese-rapid-strike-master", id: "Japanese Rapid Strike Master" },
            { value: "japanese-matchless-fighter", id: "Japanese Matchless Fighter" },
            { value: "japanese-silver-lance", id: "Japanese Silver Lance" },
            { value: "japanese-jet-black-spirit", id: "Japanese Jet Black Spirit" },
            { value: "japanese-eevee-heroes", id: "Japanese Eevee Heroes" },
            { value: "japanese-skyscraping-perfection", id: "Japanese Skyscraping Perfection" },
            { value: "japanese-blue-sky-stream", id: "Japanese Blue Sky Stream" },
            { value: "japanese-fusion-arts", id: "Japanese Fusion Arts" },
            { value: "japanese-25th-anniversary-collection", id: "Japanese 25th Anniversary Collection" },
            { value: "japanese-vmax-climax", id: "Japanese Vmax Climax" },
            { value: "japanese-star-birth", id: "Japanese Star Birth" },
            { value: "japanese-battle-region", id: "Japanese Battle Region" },
            { value: "japanese-time-gazer", id: "Japanese Time Gazer" },
            { value: "japanese-space-juggler", id: "Japanese Space Juggler" },
            { value: "japanese-dark-phantasma", id: "Japanese Dark Phantasma" },
            { value: "japanese-go", id: "Japanese Go" },
            { value: "japanese-lost-abyss", id: "Japanese Lost Abyss" },
            { value: "japanese-incandescent-arcana", id: "Japanese Incandescent Arcana" },
            { value: "japanese-paradigm-trigger", id: "Japanese Paradigm Trigger" },
            { value: "japanese-vstar-universe", id: "Japanese Vstar Universe" },
            { value: "japanese-scarlet-ex", id: "Japanese Scarlet Ex" },
            { value: "japanese-violet-ex", id: "Japanese Violet Ex" },
            { value: "japanese-triplet-beat", id: "Japanese Triplet Beat" },
            { value: "japanese-snow-hazard", id: "Japanese Snow Hazard" },
            { value: "japanese-clay-burst", id: "Japanese Clay Burst" },
            { value: "japanese-scarlet-and-violet-151", id: "Japanese Scarlet & Violet 151" },
            { value: "japanese-ruler-of-the-black-flame", id: "Japanese Ruler of the Black Flame" },
            { value: "japanese-raging-surf", id: "Japanese Raging Surf" },
            { value: "japanese-ancient-roar", id: "Japanese Ancient Roar" },
            { value: "japanese-future-flash", id: "Japanese Future Flash" },
            { value: "japanese-mega-brave", id: "Japanese Mega Brave" },
            { value: "japanese-mega-symphonia", id: "Japanese Mega Symphonia" },
            { value: "japanese-shiny-treasure-ex", id: "Japanese Shiny Treasure Ex" },
            { value: "japanese-battle-partners", id: "Japanese Battle Partners" },
            { value: "japanese-night-wanderer", id: "Japanese Night Wanderer" },
            { value: "japanese-terastal-festival", id: "Japanese Terastal Festival" },
        ],
        selectedSet: "",
        selectedName: "",
        setSearchText: "",
        filteredSets: []
    }
 
    componentDidMount() {
        const setsToUse = this.props.isJapanese ? this.state.japaneseSets : this.state.set;
        this.setState({ filteredSets: setsToUse });
    }

    handleSetChange = (event) => {
        this.setState({ selectedSet: event.target.value });
    };
    
    handleNameChange = (e) =>{
        this.setState({selectedName: e.target.value});
        console.log("Name input:", e.target.value);
    }
    
    handleSetSearchChange = (e) => {
        const searchText = e.target.value.toLowerCase();
        const setsToUse = this.props.isJapanese ? this.state.japaneseSets : this.state.set;
        const filtered = setsToUse.filter(set => 
            set.id.toLowerCase().includes(searchText) || 
            set.value.toLowerCase().includes(searchText)
        );
        
        // Clear selectedSet if search text is empty
        const newState = { 
            setSearchText: e.target.value,
            filteredSets: filtered
        };
        
        if (e.target.value === "") {
            newState.selectedSet = "";
        }
        
        this.setState(newState);
    }
    
    handleSetSelect = (setValue) => {
        const setsToUse = this.props.isJapanese ? this.state.japaneseSets : this.state.set;
        this.setState({ 
            selectedSet: setValue,
            setSearchText: setsToUse.find(s => s.value === setValue)?.id || ""
        });
    }
    render() { 
        return (
       
          <div className="form-section">
            <h1 className="borders">{this.props.isJapanese ? "Adding Japanese Cards" : "Adding Cards"}</h1>
            <form className="form-container borders">
            <label>Pokemon Name</label>
            <input id = "pokemonName" name = "pokemonName" value = {this.state.selectedName} onChange = {this.handleNameChange}/>
            <br />
            <label htmlFor="pokemonSet">{this.props.isJapanese ? "Japanese Pokemon Set (Optional)" : "Pokemon Set (Optional)"}</label>
            <input 
                id="pokemonSetSearch"
                name="pokemonSetSearch"
                type="text"
                placeholder={this.props.isJapanese ? "Type to search Japanese sets (leave empty to search all)..." : "Type to search sets (leave empty to search all)..."}
                value={this.state.setSearchText}
                onChange={this.handleSetSearchChange}
            />
            <div className="set-scroller">
                {this.state.filteredSets.map(set => (
                    <div 
                        key={set.value} 
                        className={`set-item ${this.state.selectedSet === set.value ? 'selected' : ''}`}
                        onClick={() => this.handleSetSelect(set.value)}
                    >
                        {set.id}
                    </div>
                ))}
            </div>
            <br /><br />
            <div id="error"></div>
            <button type="button" onClick={() => {
                console.log("Search with:", this.state.selectedSet, this.state.selectedName);
                // Allow search even if no set is selected - will search entire database
                this.props.fetchCards(this.state.selectedSet, this.state.selectedName);
                }}>
                Search
            </button>

            <br /><br />
            </form>
            </div>
        );
    }
}
 
export default SetList;