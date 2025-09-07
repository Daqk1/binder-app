import React, { Component } from 'react';
import SetList from './list';
import { useAuth0 } from "@auth0/auth0-react";

function DisplayWrapper(props) {
  const { user, isAuthenticated } = useAuth0();
  const userId = isAuthenticated && user ? user.sub : props.userId || "1234";
  console.log("[Auth Debug] DisplayWrapper userId:", userId, "isAuthenticated:", isAuthenticated, "user:", user);
  return <Display {...props} userId={userId} />;
}

class Display extends Component {
 fetchCards = async (setName = "", cardName = "") => {
  const userId = this.props.userId || "1234";
  console.log("[Auth Debug] fetchCards using userId:", userId);
  console.log("[Debug] fetchCards called with setName:", setName, "cardName:", cardName);
  
  try {
    // If no set is selected, search entire database (English or Japanese)
    let apiUrl;
    if (!setName && !cardName) {
      // If neither set nor card name is provided, don't search
      this.props.onDataFetched([]);
      return;
    } else if (!setName && cardName) {
      // If only card name is provided, search entire database (English or Japanese)
      const searchType = this.props.isJapanese ? "japanese" : "english";
      apiUrl = `/api/cards?cardName=${encodeURIComponent(cardName)}&searchType=${searchType}`;
    } else {
      // If set name is provided, search specific set
      apiUrl = `/api/cards?setName=${setName}&cardName=${encodeURIComponent(cardName)}`;
    }
    
    console.log("[Debug] API URL:", apiUrl);
    const cardsResponse = await fetch(apiUrl);
    const cards = await cardsResponse.json();

    const userResponse = await fetch(`/api/cards/user?userId=${userId}`);
    const userCards = await userResponse.json();

    const cardsWithCounts = cards.map(card => ({
      ...card,
      cardNumberOfCards: userCards[card.cardId]?.count || 0,
    }));

    this.props.onDataFetched(cardsWithCounts);
  } catch (error) {
    console.error("Error fetching cards:", error);
  }
};


  componentDidMount() {
    // Don't fetch cards on mount for Japanese sets - let user select a set first
    if (!this.props.isJapanese) {
      this.fetchCards();
    }
  }

  render() {
    return (
      <React.Fragment>
        <SetList fetchCards={this.fetchCards} userId={this.props.userId} isJapanese={this.props.isJapanese} />
      </React.Fragment>
    );
  }
}

export default DisplayWrapper;
