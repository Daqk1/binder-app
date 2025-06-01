import React, { Component } from 'react';
import Card from './card';

class Cards extends Component {
  render() {
    const { cards, subtractCard, addCard } = this.props;

    return (
      <div className="cards-container">
        {cards.map(card => (
          <Card
            key={card.cardId}
            card={card}
            subtractCard={subtractCard}
            addCard={addCard}
          />
        ))}
      </div>
    );
  }
}

export default Cards;
