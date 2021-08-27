import React, { useState } from 'react';
import { Container, Grid, Paper } from "@material-ui/core";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { makeStyles } from '@material-ui/core/styles';
import { getItemsBySearch } from "../actions/itemActions"

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
  },
  searchButton: {
    // marginBottom: 10,
    width: '100px',
    backgroundColor: 'transparent',
    border: '3px solid blue',
    borderRadius: '20px',
    color: 'black',
    fontWeight: 'bold',
    transition: '0.3s',
    '&:hover': {
      backgroundColor: 'blue',
      color: 'white',
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
    if (search.trim()) {
      dispatch(getItemsBySearch({ search }))
      history.push(`/items/search?searchQuery=${search || 'none'}`)
    } else {
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
              variant="outlined"
              label="search items"
              // fullWidth
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