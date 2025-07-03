import './App.css';
import React, { Component } from 'react';
import Cards from './components/cards';
import Display from './components/display';
import { Link } from 'react-router-dom';
import { Routes, Route } from "react-router-dom";
import CollectionPage from './pages/collection'; 
import 'bootstrap/dist/css/bootstrap.min.css';



class App extends Component {
  state = {
    cards: [],
    userId:"1234",
    order: [
      {id: "Numerical", value: "numbers"},
      {id: "Price (Acending)",
        value: "most"
      },
      {id: "Price (Decending)",
        value: "least"
      }
    ],
    selectedOrder: ""
  };

  addCard = async (card) => {
  const cards = [...this.state.cards];
  const index = cards.findIndex(c => c.cardId === card.cardId);
  
  if (index === -1) {
    cards.push({ ...card, cardNumberOfCards: 1 });
  } else {
    cards[index] = { ...cards[index] };
    cards[index].cardNumberOfCards++;
  }

  this.setState({ cards });

  try {
    await fetch("/api/cards/update", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        userId: this.state.userId,
        cardName: card.cardName,
        cardPrice: card.cardPrice,
        cardUrl: card.cardUrl,
        cardPicture: card.cardPicture,
        cardId: card.cardId,
        count: index === -1 ? 1 : cards[index].cardNumberOfCards,
      }),
    });
  } catch (error) {
    console.error("Failed to update card count:", error);
  }
};

subtractCard = async (card) => {
  const cards = [...this.state.cards];
  const index = cards.findIndex(c => c.cardId === card.cardId);

  if (index === -1 || cards[index].cardNumberOfCards === 0) return;

  cards[index] = { ...cards[index] };
  cards[index].cardNumberOfCards--;

  this.setState({ cards });

  try {
    await fetch("/api/cards/update", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        userId: this.state.userId,
        cardName: card.cardName,
        cardPrice: card.cardPrice,
        cardUrl: card.cardUrl,
        cardPicture: card.cardPicture,
        cardId: card.cardId,
        count: cards[index].cardNumberOfCards,
      }),
    });
  } catch (error) {
    console.error("Failed to update card count:", error);
  }
};

  displayCards = (data) => {
  const sorted = this.sortCards(data, this.state.selectedOrder);
  this.setState({ cards: sorted });
};

  sortCards = (cards, selectedOrder) => {
  switch (selectedOrder) {
    case "numbers":
      return [...cards].sort((a, b) => {
        // Assuming cardId is a number or string like "001", "002"
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

    console.log("Order Changed:", selectedValue);
  };

  
  render() {
    return (
      <div className="layout-container">
        <nav>
        <Link to="/">Home</Link> | <Link to="/collection">Collection</Link>
        </nav>
        <Routes>
          <Route path="/" element={
            <>
              <div className="main-container">
                <Display onDataFetched={this.displayCards} userId = {this.state.userId} />
                    <select
                        id="order"
                        name="displayOrder"
                        value={this.state.selectedOrder}
                        onChange={this.selectedOrder}
                      >
                        {this.state.order.map(order => (
                          <option key={order.id} value={order.value}>
                            {order.id}
                          </option>
                        ))}
                      </select>
                    </div>
              <div className="cards-container">
                <Cards
                  cards={this.state.cards}
                  subtractCard={this.subtractCard}
                  addCard={this.addCard}
                />
              </div>
            </>
          } />

          <Route path="/collection" element={<CollectionPage />} />
        </Routes>
      </div>
    );
  }
}

export default App;
