import React, { Component } from 'react';
import SetList from './list';

class Display extends Component {
 fetchCards = async (setName = "journey-together", cardName = "") => {
  const userId = this.props.userId || "1234";
  try {
    const cardsResponse = await fetch(`/api/cards?setName=${setName}&cardName=${encodeURIComponent(cardName)}`);
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
    this.fetchCards();
  }

  render() {
    return (
      <React.Fragment>
        <SetList fetchCards={this.fetchCards} userId={this.props.userId} />
      </React.Fragment>
    );
  }
}

export default Display;
