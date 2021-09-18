import React, { useState } from 'react';
import { Container, Grid, Paper } from "@material-ui/core";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { makeStyles } from '@material-ui/core/styles';
import { getItemsBySearch, getItems } from "../actions/itemActions"

const useStyles = makeStyles(() => ({
  searchPaper: {
    boxShadow: 'none',
  },
  appBarSearch: {
    display: 'flex',
    boxShadow: 'none',
  },
  searchField: {
    fontFamily: 'Montserrat',
    fontWeight: 'bold',
    height: '35px',
    marginTop: '1px',
    backgroundColor: '#D3D3D3',
    border: 'none',
    borderRadius: '15px',
    width: '600px',
    alignItem: 'left',
    textIndent: '15px',
    marginRight: '15px',
      '&:focus': {
        outline: 'none',
      }
  },
  searchButton: {
    marginTop: '1px',
    fontFamily: 'Montserrat',
    width: '100px',
    background: 'linear-gradient(45deg, #1E90FF 30%, blue 90%)',
    border: 'none',
    borderRadius: '20px',
    color: 'white',
    fontWeight: 'bold',
    transition: '0.3s',
    cursor: 'pointer',
    marginRight: '8px',
    '&:hover': {
      background: 'linear-gradient(15deg, #1E90FF 30%, blue 90%)',
    }
  },
}));


export default function Search() {
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
    } else {
      dispatch(getItems())
      history.push('/main')
    }
  }

  return (
    <Paper className={classes.searchPaper}>
      <Container maxWidth="xl" >
        <Grid container justifyContent="center" alignItems="stretch" spacing={5}>
          <div className={classes.appBarSearch} position="static" color="inherit">
            <input
              className={classes.searchField}
              name="search"
              autoComplete="off"
              placeholder="Search by creator, item or tag"
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