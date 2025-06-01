import './App.css';
import React, { Component } from 'react';
import Cards from './components/cards';
import Display from './components/display';

class App extends Component {
  state = {
    cards: []
  };

  addCard = (card) => {
    const cards = [...this.state.cards];
    const index = cards.findIndex(c => c.cardId === card.cardId);
    cards[index] = { ...cards[index] };
    cards[index].cardNumberOfCards++;
    this.setState({ cards });
  };

  subtractCard = (card) => {
    const cards = [...this.state.cards];
    const index = cards.findIndex(c => c.cardId === card.cardId);
    if (cards[index].cardNumberOfCards === 0) return;
    cards[index] = { ...cards[index] };
    cards[index].cardNumberOfCards--;
    this.setState({ cards });
  };

  displayCards = (data) => {
    this.setState({ cards: data });
  };

  render() {
    return (
      <React.Fragment>
        <div className="layout-container">
          <div className="main-container">
            <Display onDataFetched={this.displayCards} />
          </div>
          <div className="cards-container">
            <Cards
              cards={this.state.cards}
              subtractCard={this.subtractCard}
              addCard={this.addCard}
            />
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default App;
