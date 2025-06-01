import React, { Component } from 'react';

class SetList extends Component {
    state = {
        set: [
            { value: "", id: "--Select Set--" },
            { value: "base-set", id: "Base Set" },
            { value: "jungle", id: "Jungle" },
            { value: "fossil", id: "Fossil" },
            { value: "base-set-2", id: "Base Set 2" },
            { value: "team-rocket", id: "Team Rocket" },
            { value: "gym-heroes", id: "Gym Heroes" },
            { value: "gym-challenge", id: "Gym Challenge" },
            { value: "neo-genesis", id: "Neo Genesis" },
            { value: "neo-discovery", id: "Neo Discovery" },
            { value: "neo-revelation", id: "Neo Revelation" },
            { value: "neo-destiny", id: "Neo Destiny" },
            { value: "legendary-collection", id: "Legendary Collection" },
            { value: "expedition", id: "Expedition" },
            { value: "aquapolis", id: "Aquapolis" },
            { value: "skyridge", id: "Skyridge" },
            { value: "ruby-&-sapphire", id: "Ruby & Sapphire" },
            { value: "sandstorm", id: "Sandstorm" },
            { value: "dragon", id: "Dragon" },
            { value: "team-magma-&-team-aqua", id: "Team Magma & Team Aqua" },
            { value: "hidden-legends", id: "Hidden Legends" },
            { value: "fire-red-&-leaf-green", id: "Fire Red & Leaf Green" },
            { value: "team-rocket-returns", id: "Team Rocket Returns" },
            { value: "deoxys", id: "Deoxys" },
            { value: "emerald", id: "Emerald" },
            { value: "unseen-forces", id: "Unseen Forces" },
            { value: "delta-species", id: "Delta Species" },
            { value: "legend-maker", id: "Legend Maker" },
            { value: "holon-phantoms", id: "Holon Phantoms" },
            { value: "crystal-guardians", id: "Crystal Guardians" },
            { value: "dragon-frontiers", id: "Dragon Frontiers" },
            { value: "power-keepers", id: "Power Keepers" },
            { value: "diamond-&-pearl", id: "Diamond & Pearl" },
            { value: "mysterious-treasures", id: "Mysterious Treasures" },
            { value: "secret-wonders", id: "Secret Wonders" },
            { value: "great-encounters", id: "Great Encounters" },
            { value: "majestic-dawn", id: "Majestic Dawn" },
            { value: "legends-awakened", id: "Legends Awakened" },
            { value: "stormfront", id: "Stormfront" },
            { value: "platinum", id: "Platinum" },
            { value: "rising-rivals", id: "Rising Rivals" },
            { value: "supreme-victors", id: "Supreme Victors" },
            { value: "arceus", id: "Arceus" },
            { value: "heartgold-&-soulsilver", id: "HeartGold & SoulSilver" },
            { value: "unleashed", id: "Unleashed" },
            { value: "undaunted", id: "Undaunted" },
            { value: "triumphant", id: "Triumphant" },
            { value: "call-of-legends", id: "Call of Legends" },
            { value: "black-&-white", id: "Black & White" },
            { value: "emerging-powers", id: "Emerging Powers" },
            { value: "noble-victories", id: "Noble Victories" },
            { value: "next-destinies", id: "Next Destinies" },
            { value: "dark-explorers", id: "Dark Explorers" },
            { value: "dragons-exalted", id: "Dragons Exalted" },
            { value: "boundaries-crossed", id: "Boundaries Crossed" },
            { value: "plasma-storm", id: "Plasma Storm" },
            { value: "plasma-freeze", id: "Plasma Freeze" },
            { value: "plasma-blast", id: "Plasma Blast" },
            { value: "legendary-treasures", id: "Legendary Treasures" },
            { value: "xy", id: "XY" },
            { value: "flashfire", id: "Flashfire" },
            { value: "furious-fists", id: "Furious Fists" },
            { value: "phantom-forces", id: "Phantom Forces" },
            { value: "primal-clash", id: "Primal Clash" },
            { value: "roaring-skies", id: "Roaring Skies" },
            { value: "ancient-origins", id: "Ancient Origins" },
            { value: "breakthrough", id: "Breakthrough" },
            { value: "breakpoint", id: "Breakpoint" },
            { value: "generations", id: "Generations" },
            { value: "fates-collide", id: "Fates Collide" },
            { value: "steam-siege", id: "Steam Siege" },
            { value: "evolutions", id: "Evolutions" },
            { value: "sun-&-moon", id: "Sun & Moon" },
            { value: "guardians-rising", id: "Guardians Rising" },
            { value: "burning-shadows", id: "Burning Shadows" },
            { value: "shining-legends", id: "Shining Legends" },
            { value: "crimson-invasion", id: "Crimson Invasion" },
            { value: "ultra-prism", id: "Ultra Prism" },
            { value: "forbidden-light", id: "Forbidden Light" },
            { value: "celestial-storm", id: "Celestial Storm" },
            { value: "dragon-majesty", id: "Dragon Majesty" },
            { value: "lost-thunder", id: "Lost Thunder" },
            { value: "team-up", id: "Team Up" },
            { value: "detective-pikachu", id: "Detective Pikachu" },
            { value: "unbroken-bonds", id: "Unbroken Bonds" },
            { value: "unified-minds", id: "Unified Minds" },
            { value: "hidden-fates", id: "Hidden Fates" },
            { value: "cosmic-eclipse", id: "Cosmic Eclipse" },
            { value: "sword-&-shield", id: "Sword & Shield" },
            { value: "rebel-clash", id: "Rebel Clash" },
            { value: "darkness-ablaze", id: "Darkness Ablaze" },
            { value: "champion-27s-path", id: "Champion's Path" },
            { value: "vivid-voltage", id: "Vivid Voltage" },
            { value: "shining-fates", id: "Shining Fates" },
            { value: "battle-styles", id: "Battle Styles" },
            { value: "chilling-reign", id: "Chilling Reign" },
            { value: "evolving-skies", id: "Evolving Skies" },
            { value: "celebrations", id: "Celebrations" },
            { value: "fusion-strike", id: "Fusion Strike" },
            { value: "brilliant-stars", id: "Brilliant Stars" },
            { value: "astral-radiance", id: "Astral Radiance" },
            { value: "go", id: "Pokemon Go" },
            { value: "lost-origin", id: "Lost Origin" },
            { value: "silver-tempest", id: "Silver Tempest" },
            { value: "crown-zenith", id: "Crown Zenith" },
            { value: "scarlet-&-violet", id: "Scarlet & Violet" },
            { value: "paldea-evolved", id: "Paldea Evolved" },
            { value: "obsidian-flames", id: "Obsidian Flames" },
            { value: "paradox-rift", id: "Paradox Rift" },
            { value: "scarlet-&-violet-151", id: "Pokemon 151" },
            { value: "paldean-fates", id: "Paldean Fates" },
            { value: "temporal-forces", id: "Temporal Forces" },
            { value: "twilight-masquerade", id: "Twilight Masquerade" },
            { value: "shrouded-fable", id: "Shrouded Fable" },
            { value: "stellar-crown", id: "Stellar Crown" },
            { value: "surging-sparks", id: "Surging Sparks" },
            { value: "prismatic-evolutions", id: "Prismatic Evolutions" },
            { value: "journey-together", id: "Journey Together" }

        ],
        selectedSet: "",
        selectedName: ""
    }
    handleSetChange = (event) => {
        this.setState({ selectedSet: event.target.value });
    };
    handleNameChange = (e) =>{
        this.setState({selectedName: e.target.value});
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
            <button type="button" onClick={() => this.props.fetchCards(this.state.selectedSet, this.state.selectedName)}>
                Search
            </button>
            <br /><br />
            </form>
            </div>
        );
    }
}
 
export default SetList;