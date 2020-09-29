import React from "react";
import {makeStyles} from '@material-ui/core/'

const useStyles = makeStyles({
    root: {
      minWidth: 275,
    },
    bullet: {
      display: 'inline-block',
      margin: '0 2px',
      transform: 'scale(0.8)',
    },
    title: {
      fontSize: 14,
    },
    pos: {
      marginBottom: 12,
    },
    cardImage: {
      height: '352px',
      width: '252px',
      borderRadius: '15px'
    }
});


const MagicCard = props => {
    const classes = useStyles();
    const {name,image_url} = props.card
  return (
    <img className={classes.cardImage} alt={name} src={image_url} />
  )
}

export default MagicCard;