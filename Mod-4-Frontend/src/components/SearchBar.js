import * as React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Checkbox from '@material-ui/core/Checkbox';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';

const useStyles = makeStyles((theme) => ({
    form: {
        backgroundColor: 'white',
        borderRadius: '10px',
        margin: theme.spacing(1),
        width: '50ch'
    },
    searchBar: {
        paddingTop: theme.spacing(1),
        paddingBottom: theme.spacing(1)
    },
    submitButton: {
        backgroundColor: 'white',
        borderRadius: '10px',
        margin: theme.spacing(1),
        width: '10ch'
    }
  }));

const SearchBar = (props) => {
    const classes = useStyles();

    const count = ''
    const [decks,setDecks] = React.useState([]);
    React.useEffect(() => {
        const fetchDecks = () => {
            fetch(`http://localhost:3001/decks`)
        .then(res=>res.json())
        .then(deckCollection=> setDecks(deckCollection))
        }
        fetchDecks();
    },[count]
    )

    return (
        <Container maxWidth = 'lg'>
            <form noValidate autoComplete="off">
                <Grid container spacing={1} className={classes.searchBar}>
                    <TextField onChange={(e)=>props.setTerm(e.currentTarget.value)}className={classes.form} id="outlined-basic" label="Search Term ..." variant="outlined" />
                    <FormControl variant="outlined" className={classes.form}>
                        <InputLabel htmlFor="outlined-deck-native-simple"></InputLabel>
                        <Select
                            native value = {props.selectedDeck}
                            onChange={(e)=>props.setDeck(parseInt(e.currentTarget.value))}
                            label="Deck Select"
                            inputProps={{
                                name: 'Deck',
                                id: 'outlined-deck-native-simple',
                            }}
                        >
                            {decks.map(deck => 
                                <option 
                                    value={deck.id}
                                    key={deck.id}
                                    >
                                        {deck.name}
                                </option>)
                            }
                        </Select>
                    </FormControl>
                </Grid>
                    <FormGroup aria-label="position" row>
                        <FormControlLabel onChange={(e)=>props.setCheck(e.currentTarget.value)}
                            value="name"
                            control={<Checkbox color="primary" />}
                            label="Name"
                            labelPlacement="bottom"
                        />
                        <FormControlLabel onChange={(e)=>props.setCheck(e.currentTarget.value)}
                            value="type"
                            control={<Checkbox color="primary" />}
                            label="Type"
                            labelPlacement="bottom"
                            color='primary'
                        />
                        <FormControlLabel onChange={(e)=>props.setCheck(e.currentTarget.value)}
                            value="text"
                            control={<Checkbox color="primary" />}
                            label="Text"
                            labelPlacement="bottom"
                        />
                        <FormControlLabel onChange={(e)=>props.setCheck(e.currentTarget.value)}
                            value="white"
                            control={<Checkbox color="primary" />}
                            label="White"
                            labelPlacement="bottom"
                        />
                        <FormControlLabel onChange={(e)=>props.setCheck(e.currentTarget.value)}
                            value="blue"
                            control={<Checkbox color="primary" />}
                            label="Blue"
                            labelPlacement="bottom"
                            color='primary'
                        />
                        <FormControlLabel onChange={(e)=>props.setCheck(e.currentTarget.value)}
                            value="black"
                            control={<Checkbox color="primary" />}
                            label="Black"
                            labelPlacement="bottom"
                        />
                        <FormControlLabel onChange={(e)=>props.setCheck(e.currentTarget.value)}
                            value="red"
                            control={<Checkbox color="primary" />}
                            label="Red"
                            labelPlacement="bottom"
                        />
                        <FormControlLabel onChange={(e)=>props.setCheck(e.currentTarget.value)}
                            value="green"
                            control={<Checkbox color="primary" />}
                            label="Green"
                            labelPlacement="bottom"
                        />
                    </FormGroup>
                <Grid>

                </Grid>
            </form>
        </Container>
    );
}

export default SearchBar;