import React, { Component } from "react";
import MagicCard from '../components/MagicCard'
import {Grid} from '@material-ui/core';

class CardCollection extends Component {
  
  renderCards = ()=>{
    return this.props.cardCollection.map( card => 
      <MagicCard 
        key={card.id} 
        card={card}
      />
    )
  }

  render() {
    return (
        <Grid
            container
            direction="row"
            justify="center"
            alignItems="center"
            item xs={6} sm={3}
        >
            {this.renderCards()}
        </Grid>
    );
  }
}

export default CardCollection;
