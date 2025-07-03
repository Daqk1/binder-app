import React, { Component } from 'react';
import Cards from '../components/cards';

class CollectionPage extends Component {
  state = {
    cards: [],
    totalPrice: 0
  };

  componentDidMount() {
    this.fetchCards();
  }

  fetchCards = async () => {
    const userId = this.props.userId;
    try {
      const response = await fetch(`/api/cards/user?userId=${userId}`);
      const cardData = await response.json();

      const cards = Object.entries(cardData).map(([cardId, card]) => ({
        cardId,
        ...card,
        cardNumberOfCards: card.count || 1,
      }));

      const totalPrice = cards.reduce(
        (sum, card) => sum + (card.cardPrice || 0) * (card.cardNumberOfCards || 0),
        0
      );

      this.setState({ cards, totalPrice });
    } catch (error) {
      console.error("Error fetching cards:", error);
    }
  };

  addCard = async (card) => {
    const cards = [...this.state.cards];
    const index = cards.findIndex(c => c.cardId === card.cardId);
    let addedPrice = card.cardPrice || 0;

    if (index === -1) {
      cards.push({ ...card, cardNumberOfCards: 1 });
    } else {
      cards[index] = { ...cards[index] };
      cards[index].cardNumberOfCards++;
    }

    this.setState(prevState => ({
      cards,
      totalPrice: prevState.totalPrice + addedPrice
    }));

    await this.updateCardOnServer(cards[index] || card, cards[index]?.cardNumberOfCards || 1);
  };

  subtractCard = async (card) => {
    const cards = [...this.state.cards];
    const index = cards.findIndex(c => c.cardId === card.cardId);

    if (index === -1 || cards[index].cardNumberOfCards <= 0) return;

    let removedPrice = card.cardPrice || 0;

    cards[index] = { ...cards[index] };
    cards[index].cardNumberOfCards--;

    const count = cards[index].cardNumberOfCards;

    if (count === 0) {
      cards.splice(index, 1);
    }

    this.setState(prevState => ({
      cards,
      totalPrice: prevState.totalPrice - removedPrice
    }));

    await this.updateCardOnServer(card, count);
  };

  updateCardOnServer = async (card, count) => {
    const userId = this.props.userId;
    try {
      await fetch("/api/cards/update", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId: userId,
          cardName: card.cardName,
          cardPrice: card.cardPrice,
          cardUrl: card.cardUrl,
          cardPicture: card.cardPicture,
          cardId: card.cardId,
          count: count
        })
      });
    } catch (error) {
      console.error("Failed to update card count:", error);
    }
  };

  render() {
    return (
      <div className="layout-container">
        <div>
          <div className = "main-container">
            <h2>Your Collection</h2>
            <p>Total Value: ${this.state.totalPrice.toFixed(2)}</p>
          </div>
          <div className="cards-container">
            <Cards
              cards={this.state.cards}
              subtractCard={this.subtractCard}
              addCard={this.addCard}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default CollectionPage;
