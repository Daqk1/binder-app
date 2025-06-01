import React, { Component } from 'react';
class Card extends Component {
  render() {
    const { card, addCard, subtractCard } = this.props;

    return (
          <div className="card">
              <h3>{card.cardName}</h3>
              <img
                src={card.cardPicture}
                alt={card.cardName}
                className = "image-container"
              />
              <p>Price: ${card.cardPrice}</p>
              <div className="b">
                <button className="minusButton" onClick={() => subtractCard(card)}>-</button>
                <p>{card.cardNumberOfCards}</p>
                <button className="addButton" onClick={() => addCard(card)}>+</button>
              </div>
              <a href={card.cardUrl} target="_blank" rel="noopener noreferrer">View Card</a>
            </div>
    );
  }
}

export default Card;
