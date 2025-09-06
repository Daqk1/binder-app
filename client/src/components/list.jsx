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
        selectedSet: "",
        selectedName: "",
        setSearchText: "",
        filteredSets: []
    }
    componentDidMount() {
        this.setState({ filteredSets: this.state.set });
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
        const filtered = this.state.set.filter(set => 
            set.id.toLowerCase().includes(searchText) || 
            set.value.toLowerCase().includes(searchText)
        );
        this.setState({ 
            setSearchText: e.target.value,
            filteredSets: filtered
        });
    }
    
    handleSetSelect = (setValue) => {
        this.setState({ 
            selectedSet: setValue,
            setSearchText: this.state.set.find(s => s.value === setValue)?.id || ""
        });
    }
    render() { 
        return (
       
          <div className="form-section">
            <h1 className="borders">Adding Cards</h1>
            <form className="form-container borders">
            <label>Pokemon Name</label>
            <input id = "pokemonName" name = "pokemonName" value = {this.state.selectedName} onChange = {this.handleNameChange}/>
            <br />
            <label htmlFor="pokemonSet">Pokemon Set</label>
            <input 
                id="pokemonSetSearch"
                name="pokemonSetSearch"
                type="text"
                placeholder="Type to search sets..."
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