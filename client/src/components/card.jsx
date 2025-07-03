import React, { Component } from 'react';
class Card extends Component {
  render() {
    const { card, addCard, subtractCard } = this.props;

    return (
          <div className="card">
              <img
                src={card.cardPicture}
                alt={card.cardName}
                className = "image-container"
              />
              <div className="b">
                <button className="minusButton" onClick={() => subtractCard(card)}>-</button>
                <button className="addButton" onClick={() => addCard(card)}>+</button>
              </div>
              <a href={card.cardUrl} target="_blank" rel="noopener noreferrer">View Card</a>
              <div className="card-badges-bottom">
                <span className="count-badge">{card.cardNumberOfCards}</span>
                <span className="price-badge">${card.cardPrice}</span>
              </div>
            </div>
    );
  }
}

export default Card;
