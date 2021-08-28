import React, { useState } from 'react';
import { Container, Grid, Paper } from "@material-ui/core";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { makeStyles } from '@material-ui/core/styles';
import { getItemsBySearch, getItems } from "../actions/itemActions"

const useStyles = makeStyles((theme) => ({
  searchPaper: {
    boxShadow: 'none',
    // width: '700px',
    // marginLeft: 'auto',
    // marginRight: 'auto',
  },
  gridContainer: {
    // marginTop: '7px',
  },
  appBarSearch: {
    // borderRadius: 8,
    // marginBottom: '1rem',
    display: 'flex',
    // padding: '16px',
    boxShadow: 'none',
  },
  searchField: {
    // marginBottom: '5px',
    backgroundColor: '#D3D3D3',
    border: 'none',
    borderRadius: '10px',
    width: '600px',
  },
  searchButton: {
    fontFamily: 'Montserrat',
    width: '100px',
    background: 'linear-gradient(45deg, #1E90FF 30%, blue 90%)',
    border: 'none',
    borderRadius: '20px',
    color: 'white',
    fontWeight: 'bold',
    transition: '0.3s',
    cursor: 'pointer',
    '&:hover': {
      background: 'linear-gradient(15deg, #1E90FF 30%, blue 90%)',
    }
  },
}));


const Search = () => {
  const [search, setSearch] = useState("")

  const classes = useStyles();
  const history = useHistory();
  const dispatch = useDispatch();

  const handleKeyPress = (e) => {
    if (e.keyCode === 13) {    // 13 is the enter key
      searchItem();
    }
  }

  const searchItem = () => {
    console.log('search button clicked!')
    if (search.trim()) {
      dispatch(getItemsBySearch({ search }))
      // history.push(`/items/search?searchQuery=${search || 'none'}`)
      // history.push(`/search`)
    } else {
      dispatch(getItems())
      history.push('/main')
    }
  }

  return (
    <Paper className={classes.searchPaper}>
      <Container maxWidth="xl" >
        <Grid container justifyContent="center" alignItems="stretch" spacing={5} className={classes.gridContainer}>
          {/* <Typography variant="h6">Search for a Product to Rent</Typography> */}
          <div className={classes.appBarSearch} position="static" color="inherit">
            <input
              className={classes.searchField}
              name="search"
              autoComplete="off"
              placeholder="search items"
              value={search}
              onKeyPress={handleKeyPress}
              onChange={(e) => setSearch(e.target.value)}
            />
            <button onClick={searchItem} size="large" className={classes.searchButton} variant="contained">Search</button>
          </div>
        </Grid>
      </Container>
    </Paper>
  )
}

export default Search;