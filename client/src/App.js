import './App.css';
import React, { Component } from 'react';
import Cards from './components/cards';
import Display from './components/display';
import { Link } from 'react-router-dom';
import { Routes, Route } from "react-router-dom";
import CollectionPage from './pages/collection'; 
import 'bootstrap/dist/css/bootstrap.min.css';
import { useAuth0 } from "@auth0/auth0-react";

function AuthButtons() {
  const { loginWithRedirect, logout, isAuthenticated, user, isLoading } = useAuth0();

  if (isLoading) return null;
  if (!isAuthenticated) {
    return <button onClick={() => loginWithRedirect()}>Log In</button>;
  }
  return (
    <div style={{ display: 'inline-flex', alignItems: 'center', gap: '1em' }}>
      <span>Welcome, {user.name || user.email}!</span>
      <button onClick={() => logout({ returnTo: window.location.origin })}>Log Out</button>
    </div>
  );
}

// Functional wrapper to inject userId from Auth0
function AppWithAuth0(props) {
  const { user, isAuthenticated, isLoading } = useAuth0();
  // Use Auth0 user.sub as userId if authenticated, else fallback to '1234'
  const userId = isAuthenticated && user ? user.sub : "1234";
  return <App {...props} userId={userId} />;
}

class App extends Component {
  state = {
    cards: [],
    order: [
      {id: "Numerical", value: "numbers"},
      {id: "Price (Acending)", value: "most"},
      {id: "Price (Decending)", value: "least"}
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
          userId: this.props.userId,
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
          userId: this.props.userId,
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
          {' '}<AuthButtons />
        </nav>
        <Routes>
          <Route path="/" element={
            <div className="main-content">
              <div className="main-container">
                <Display onDataFetched={this.displayCards} userId={this.props.userId} />
                <div className="borders">
                  <label htmlFor="order">Sort Cards</label>
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
              </div>
              <Cards
                cards={this.state.cards}
                subtractCard={this.subtractCard}
                addCard={this.addCard}
              />
            </div>
          } />
          <Route path="/collection" element={<CollectionPage userId={this.props.userId} />} />
        </Routes>
      </div>
    );
  }
}

export default AppWithAuth0;
