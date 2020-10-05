import * as React from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import MainListItems from './MainListItems';
import DeckBox from '../containers/DeckBox';
import Search from '../containers/Search';
import DeckList from '../components/DeckList';
import Grid from '@material-ui/core/Grid'
import LogoImg from '../components/Logo.png';

const drawerWidth = 300;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  toolbar: {
    paddingRight: 24, // keep right padding when drawer closed
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
    backgroundColor:
      theme.palette.mode === 'light'
        ? theme.palette.grey[100]
        : theme.palette.grey[900],
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
  },
  cardImage: {
    height: '380.16px',
    width: '272.16px',
    borderRadius: '15px',
    marginTop: 15,
    marginLeft: 15
  },
  logo: {
    width: '240.16px'
  }
}));

const Dashboard = ()=>{
  const classes = useStyles();
  const [open, setOpen] = React.useState(true);
  const toggleDrawer = () => {
    setOpen(!open);
  };
  const [tab, setTab] = React.useState('Decks');
  const changeTab = (tab) => {
    setTab(tab);
  }

  const count = ''
  const [decks,setDecks] = React.useState([]);
  const [currentDeckList,setCurrentDeckList] = React.useState([])
  const [selectedDeck,setDeck] = React.useState(1)
  const magicBack = 'https://c1.scryfall.com/file/scryfall-card-backs/large/59/597b79b3-7d77-4261-871a-60dd17403388.jpg?1561757283'
  const [imageShown,setImage] = React.useState(magicBack)

  React.useEffect(() => {
      const fetchDecks = () => {
          fetch(`http://localhost:3001/decks`)
      .then(res=>res.json())
      .then(deckCollection=> {
        setDecks(deckCollection);
        setCurrentDeckList(fetchCards(deckCollection))
        })
      }
      fetchDecks();
    },[selectedDeck]
  )

  const fetchCards = (deckCollection) => {
    let deckList = []
      deckCollection[selectedDeck-1].deck_cards.map(deck_card => 
          deckCollection[selectedDeck-1].cards.map(card => 
            card.id === deck_card.card_id ? deckList.push({card: card, deck_card: deck_card.id }) : null))
            console.log(deckList)
    return deckList
  }
   
  const addToDeck = (id)=>{
    const decksUpdate = [...decks]
    fetch('http://localhost:3001/deck_cards',{
      method: 'POST',
      body: JSON.stringify({deck_id: selectedDeck, card_id: id}),
      headers: {
        "Content-type": "application/json"
      }
    })
    .then(res => res.json())
    .then(deckCardObj => {
      decksUpdate[selectedDeck-1].deck_cards.push(deckCardObj.deck_card)
      if(decksUpdate[selectedDeck-1].cards.filter(card=> card.id === deckCardObj.card.id).length === 0){
        decksUpdate[selectedDeck-1].cards.push(deckCardObj.card)
      }
      setCurrentDeckList(fetchCards(decksUpdate))
      setDecks(decksUpdate)
      }
    )
  }

  const removeFromDeck = (id)=>{
    const decksUpdate = [...decks]
    fetch(`http://localhost:3001/deck_cards/${id}`,{
      method: 'DELETE'
    })
    .then(res=>res.json())
    .then(deletedDeckCard => {
      let newDeckList = decks[selectedDeck-1].deck_cards.filter(deck_card => deck_card.id !== deletedDeckCard.id)
      decksUpdate[selectedDeck-1].deck_cards = newDeckList
      setCurrentDeckList(fetchCards(decksUpdate))
      setDecks(decksUpdate)
    })
  }

  const renderView = () => {
    let showTab = ''
    switch(tab){
      case "Decks": showTab = <DeckBox decks={decks} setTab={setTab} setDeck={setDeck} setCurrentDeckList={setCurrentDeckList} fetchCards={fetchCards}/>
      break;
      case "Search": showTab = <Search setDeck={setDeck} selectedDeck={selectedDeck} addToDeck={addToDeck}/>
      break;
      case "DeckList": 
        showTab = <DeckList 
                    setImage={setImage} 
                    magicBack={magicBack} 
                    selectedDeck={selectedDeck} 
                    decks={decks} 
                    currentDeckList={currentDeckList} 
                    removeFromDeck={removeFromDeck} 
                  />
      break;
      default:
      break;
    }
    return showTab
  }

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar
        position="absolute"
        className={clsx(classes.appBar, open && classes.appBarShift)}
      >
        <Toolbar className={classes.toolbar}>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="open drawer"
            onClick={toggleDrawer}
            className={clsx(
              classes.menuButton,
              open && classes.menuButtonHidden,
            )}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            component="h1"
            variant="h6"
            color="inherit"
            noWrap
            className={classes.title}
          >
            {tab}
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        classes={{
          paper: clsx(classes.drawerPaper, !open && classes.drawerPaperClose),
        }}
        open={open}
      >
        <div className={classes.toolbarIcon}>
          <Grid>
            <img className={classes.logo} src={LogoImg} />
          </Grid>
          <IconButton onClick={toggleDrawer}>
            <ChevronLeftIcon />
          </IconButton>
        </div>
        <Divider />
        <List>
          < MainListItems changeTab={changeTab}/>
        </List>
        <Divider />
          <Grid>
            <img className={classes.cardImage} src={imageShown} />
          </Grid>
        </Drawer>
      <main className={classes.content}>
          {renderView()} 
      </main>
    </div>
  );
}

export default Dashboard;