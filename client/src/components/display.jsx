import React, { Component } from 'react';
import SetList from './list';

class Display extends Component {
  state = {
    list: []
  };

  fetchCards = (setName, cardName) => {
    const params = new URLSearchParams();

    if (setName) {
      params.append("setName", setName);
    }
    if (cardName) {
      params.append("cardName", cardName);
    }

    fetch(`/api/cards?${params.toString()}`)
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        return response.json();
      })
      .then(data => {
        this.setState({ list: data }, () => {
          if (this.props.onDataFetched) {
            this.props.onDataFetched(this.state.list);
          }
        });
      })
      .catch(error => console.error('Fetch error:', error));
  };

  render() {
    return (
      <React.Fragment>
        <SetList fetchCards={this.fetchCards} />
      </React.Fragment>
    );
  }
}

export default Display;
