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
      <Title>{props.deck.name}</Title>
      <Typography component="p" variant="h4">
        {props.deck.colors}
      </Typography>
      <Typography color="textSecondary" className={classes.depositContext}>
        on 15 March, 2019
      </Typography>
    </React.Fragment>
  );
}
export default Deck;