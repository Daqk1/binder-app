import React, { Component } from 'react';

class SetList extends Component {
    state = {
        set: [
            { value: "", id: "--Select Set--" },
            { value: "ancient-origins", id: "Ancient Origins" },
            { value: "aquapolis", id: "Aquapolis" },
            { value: "arceus", id: "Arceus" },
            { value: "astral-radiance", id: "Astral Radiance" },
            { value: "base-set", id: "Base Set" },
            { value: "base-set-2", id: "Base Set 2" },
            { value: "battle-styles", id: "Battle Styles" },
            { value: "black-&-white", id: "Black & White" },
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
            { value: "detective-pikachu", id: "Detective Pikachu" },
            { value: "diamond-&-pearl", id: "Diamond & Pearl" },
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
            { value: "fire-red-&-leaf-green", id: "Fire Red & Leaf Green" },
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
            { value: "heartgold-&-soulsilver", id: "HeartGold & SoulSilver" },
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
            { value: "ruby-&-sapphire", id: "Ruby & Sapphire" },
            { value: "sandstorm", id: "Sandstorm" },
            { value: "scarlet-&-violet", id: "Scarlet & Violet" },
            { value: "scarlet-&-violet-151", id: "Pokemon 151" },
            { value: "secret-wonders", id: "Secret Wonders" },
            { value: "shining-fates", id: "Shining Fates" },
            { value: "shining-legends", id: "Shining Legends" },
            { value: "shrouded-fable", id: "Shrouded Fable" },
            { value: "silver-tempest", id: "Silver Tempest" },
            { value: "skyridge", id: "Skyridge" },
            { value: "steam-siege", id: "Steam Siege" },
            { value: "stellar-crown", id: "Stellar Crown" },
            { value: "stormfront", id: "Stormfront" },
            { value: "sun-&-moon", id: "Sun & Moon" },
            { value: "supreme-victors", id: "Supreme Victors" },
            { value: "surging-sparks", id: "Surging Sparks" },
            { value: "sword-&-shield", id: "Sword & Shield" },
            { value: "team-magma-&-team-aqua", id: "Team Magma & Team Aqua" },
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
            { value: "xy", id: "XY" }
        ],
        selectedSet: "",
        selectedName: ""
    }
    handleSetChange = (event) => {
        this.setState({ selectedSet: event.target.value });
    };
    handleNameChange = (e) =>{
        this.setState({selectedName: e.target.value});
        console.log("Name input:", e.target.value);

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
            <select   
            id="pokemonSet"
                    name="pokemonSet"
                    value={this.state.selectedSet}
                    onChange={this.handleSetChange}>
                {this.state.set.map(set => (
                <option key={set.value} value={set.value}>
                    {set.id}
                </option>
                ))}
            </select>
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