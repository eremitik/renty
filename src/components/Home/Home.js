import React, { useEffect } from 'react';
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux'
import { getItems } from "../../actions/itemActions";
import { CircularProgress, Grid } from '@material-ui/core';
import { makeStyles } from "@material-ui/core/styles";
import Item from '../Item.js';
import './Home.css';


const useStyles = makeStyles((theme) => ({
  mainContainer: {
    display: 'flex',
    alignItems: 'center',
  },
  smMargin: {
    margin: theme.spacing(1),
  },
  actionDiv: {
    textAlign: 'center',
  },
}))

export default function BottomBar () {

  const history = useHistory();
  const classes = useStyles();

  const handleRedirect = () => {
    history.push('/login')
  }

  const dispatch = useDispatch()
  
  useEffect(() => {
    dispatch(getItems())
  }, [dispatch])


  const itemList = useSelector(state => state.itemList)
  const { items } = itemList

  const userLogin = useSelector(state => state.userLogin)
  const { userInfo } = userLogin

  return (
    <div>
      <h2 className="logo">R</h2>
      <a href="https://twitter.com/eremitik">
        <img className="img" src="https://i.ibb.co/Wnxq2Nq/twitter.png"/>
      </a>
{/* 
      <Grid className={classes.container} container alignItems="stretch" spacing={3}>
        {items.map((item) => (
          <Grid key={item._id} item xs={12} sm={2}>
            <Item item={item} userInfo={userInfo}/>
          </Grid>
          ))}
        </Grid>
 */}
      <div className="barContainer">
        <div className="copyContainer">
          <h1 className="h1">Decentralized renting platform.</h1>
          {/* <h2>Open beta live now.</h2> */}
        </div>
        <button className="button" onClick={handleRedirect}>GET STARTED</button>

      </div>
    </div>

  )
}