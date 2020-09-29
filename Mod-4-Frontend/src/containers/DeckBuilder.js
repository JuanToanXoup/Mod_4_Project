import React, { Component } from "react";
import CardCollection from './CardCollection';
import YourDeck from './YourDeck';

class DeckBuilder extends Component {
  
  state = {
    cardCollection: [],
    selectedCard: []
  }

  componentDidMount(){
    this.fetchCardCollection()
  }

  render() {
    return(
      <div>
          <CardCollection
            cardCollection = {this.state.cardCollection}
          />
          {/* <YourDeck/> */}
      </div>
    )
  }

  fetchCardCollection = ()=>{
    fetch(`http://localhost:3001/cards`)
    .then(res=>res.json())
    .then(cardCollection=> {
      this.setState({
        cardCollection: cardCollection
      })
    })
  }

  
}

export default DeckBuilder