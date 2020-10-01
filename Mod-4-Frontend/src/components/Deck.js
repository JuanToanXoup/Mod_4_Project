import * as React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Title from './Title';

const useStyles = makeStyles({
  depositContext: {
    flex: 1,
  },
});

const Deck = (props) => {
  const classes = useStyles();
  return (
    <React.Fragment>
      
      <Typography component="p" variant="h4">
        {props.deck.name}
      </Typography>
      <Title>{props.deck.colors}</Title>
      <Typography color="textSecondary" className={classes.depositContext}>
        Made on 30 September, 2020
      </Typography>
    </React.Fragment>
  );
}
export default Deck;