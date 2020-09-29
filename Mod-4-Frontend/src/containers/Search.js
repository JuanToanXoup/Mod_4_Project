import * as React from 'react';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import MagicCard from '../components/MagicCard'
import SearchBar from '../components/SearchBar'


const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  toolbar: {
    paddingRight: 24, 
  },
  toolbarIcon: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: '0 8px',
    ...theme.mixins.toolbar,
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: 36,
  },
  menuButtonHidden: {
    display: 'none',
  },
  title: {
    flexGrow: 1,
  },
  drawerPaper: {
    position: 'relative',
    whiteSpace: 'nowrap',
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerPaperClose: {
    overflowX: 'hidden',
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    width: theme.spacing(7),
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing(9),
    },
  },
  appBarSpacer: theme.mixins.toolbar,
  content: {
    backgroundColor: '#778899',
    flexGrow: 1,
    height: '100vh',
    overflow: 'auto',
  },
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
  paper: {
    padding: theme.spacing(2),
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'column',
  },
  fixedHeight: {
    height: 250,
  }
}));

const Search = (props) => {
    const classes = useStyles();

    const count = ''
    const [cards,setCards] = React.useState([]);
    const [filteredCards,setFilter] = React.useState([]);
    const [searchTerm, setSearchTerm] = React.useState('');
    const [nameCheck, setNameCheck] = React.useState(false);
    const [textCheck, setTextCheck] = React.useState(false);
    const [typeCheck, setTypeCheck] = React.useState(false);



    React.useEffect(() => {
        const fetchCards = () => {
            fetch(`http://localhost:3001/cards`)
        .then(res=>res.json())
        .then(cardCollection=> setCards(cardCollection))
        }
        fetchCards();
        },[count]
    )

    React.useEffect(()=>{
    filterCards();
    },[searchTerm])
    React.useEffect(()=>{
    filterCards();
    },[nameCheck])
    React.useEffect(()=>{
    filterCards();
    },[textCheck])
    React.useEffect(()=>{
    filterCards();
    },[typeCheck])

    const filterCards = ()=>{
        let nameFilter = []
        let textFilter = []
        let typeFilter = []
        if(nameCheck){nameFilter = cards.filter(card => card.name.toLowerCase().includes(searchTerm.toLowerCase()))}
        if(textCheck){textFilter = cards.filter(card => card.text !== null).filter(card => card.text.toLowerCase().includes(searchTerm.toLowerCase()))}
        if(typeCheck){typeFilter = cards.filter(card => card.type !== null).filter(card => card.cardtype.toLowerCase().includes(searchTerm.toLowerCase()))}
        setFilter( [...new Set([...nameFilter,...textFilter,...typeFilter])] )
    }

    const setTerm = (term) => {
        console.log(term)
        setSearchTerm(term)
    }

    const setCheck = (checkbox) => {
        switch(checkbox){
            case 'name': setNameCheck(!nameCheck)
                break;
            case 'text': setTextCheck(!textCheck)
                break;
            case 'type': setTypeCheck(!typeCheck)
                break;
            default:
                break;
        }
    }

    return (
      <main className={classes.content}>
        <div className={classes.appBarSpacer} />
          <Container maxWidth="lg" className={classes.container}>
            <SearchBar 
              setDeck={props.setDeck} 
              selectedDeck={props.selectedDeck} 
              setTerm={setTerm} 
              setCheck={setCheck} 
              className={classes.searchBar}
            />
            <Grid container spacing={1}>
              {
                filteredCards.map(card => 
                  <Grid onClick={()=>props.addToDeck(card.id)} key={card.id} item xs={12} md={4} lg={3}>
                    <MagicCard  card={card}/>
                  </Grid>
                )
              }
            </Grid>
          </Container>
      </main>
    );
}

export default Search;