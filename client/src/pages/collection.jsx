import React, { Component } from 'react';
import Cards from '../components/cards';

class CollectionPage extends Component {
  state = {
    cards: [],
    totalPrice: 0,
    order: [
      {id: "Numerical", value: "numbers"},
      {id: "Price (Ascending)", value: "most"},
      {id: "Price (Descending)", value: "least"}
    ],
    selectedOrder: ""
  };

  componentDidMount() {
    this.fetchCards();
  }

  fetchCards = async () => {
    const userId = this.props.userId;
    
    // Don't fetch if userId is null
    if (!userId) {
      console.log("[Auth Debug] No userId, skipping collection fetch");
      return;
    }
    
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

      const sortedCards = this.sortCards(cards, this.state.selectedOrder);
      this.setState({ cards: sortedCards, totalPrice });
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
    
    // Don't update if userId is null
    if (!userId) {
      console.log("[Auth Debug] No userId, skipping server update");
      return;
    }
    
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

  sortCards = (cards, selectedOrder) => {
    switch (selectedOrder) {
      case "numbers":
        return [...cards].sort((a, b) => {
          return a.cardId.localeCompare(b.cardId, undefined, { numeric: true });
        });
      case "most":
        return [...cards].sort((a, b) => parseFloat(a.cardPrice) - parseFloat(b.cardPrice));
      case "least":
        return [...cards].sort((a, b) => parseFloat(b.cardPrice) - parseFloat(a.cardPrice));
      default:
        return cards;
    }
  };

  selectedOrder = (event) => {
    const selectedValue = event.target.value;
    const sorted = this.sortCards(this.state.cards, selectedValue);
    this.setState({
      selectedOrder: selectedValue,
      cards: sorted
    });
    console.log("Collection Order Changed:", selectedValue);
  };

  render() {
    const { cards, totalPrice } = this.state;
    const totalCards = cards.reduce((sum, card) => sum + (card.cardNumberOfCards || 0), 0);
    const uniqueCards = cards.length;

    return (
      <div className="layout-container">
        <div className="collection-content">
          <div className="collection-header">
            <h1 className="collection-title">Your Collection</h1>
            <p className="collection-subtitle">Track and manage your Pokémon card collection</p>
            <div className="total-value">
              Total Value: ${totalPrice.toFixed(2)}
            </div>
            <div className="collection-stats">
              <div className="stat-item">
                <div className="stat-value">{totalCards}</div>
                <div className="stat-label">Total Cards</div>
              </div>
              <div className="stat-item">
                <div className="stat-value">{uniqueCards}</div>
                <div className="stat-label">Unique Cards</div>
              </div>
              <div className="stat-item">
                <div className="stat-value">{totalCards > 0 ? (totalPrice / totalCards).toFixed(2) : '0.00'}</div>
                <div className="stat-label">Avg. Value</div>
              </div>
            </div>
          </div>
          
          <div className="collection-cards">
            <h2 className="collection-cards-title">Your Cards</h2>
            {cards.length > 0 && (
              <div className="borders collection-sort">
                <label htmlFor="collectionOrder">Sort Cards</label>
                <select
                  id="collectionOrder"
                  name="collectionOrder"
                  value={this.state.selectedOrder}
                  onChange={this.selectedOrder}
                >
                  {this.state.order.map(order => (
                    <option key={order.value} value={order.value}>
                      {order.id}
                    </option>
                  ))}
                </select>
              </div>
            )}
            <div className="collection-cards-grid">
              {cards.length > 0 ? (
                <Cards
                  cards={cards}
                  subtractCard={this.subtractCard}
                  addCard={this.addCard}
                />
              ) : (
                <div className="empty-collection">
                  <h3>No Cards in Collection</h3>
                  <p>Start building your collection by searching for cards on the home page!</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default CollectionPage;
