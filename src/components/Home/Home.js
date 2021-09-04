import React, { useEffect, useState } from 'react';
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux'
import { getItems } from "../../actions/itemActions";
import { CircularProgress, Grid } from '@material-ui/core';
import { makeStyles } from "@material-ui/core/styles";
import Item from '../Item.js';
import Carousel from '@brainhubeu/react-carousel';
import '@brainhubeu/react-carousel/lib/style.css';

import Card1 from '../../images/card1.png';
import Card2 from '../../images/card2.png';
import Card3 from '../../images/card3.png';
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
  grid: {
    width: '300px',
  }
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

      <div className="positionWB">
      <div className="whiteBox">
        <h1 className="titleCopy">Renty is the first</h1>
        <h1 className="titleCopy">community-driven</h1>
        <h1 className="titleCopy">rental platform.</h1>
        <br></br>
        <br></br>
        <h2 className="subtitleCopy">Borrow, share or browse real items</h2>
        <h2 className="subtitleCopy">and pay with fiat or crypto.</h2>
      </div>
      </div>

      <div className="carousel">
      <Carousel plugins={['arrows']}>
        <img className="carouselImage" src={Card1} />
        <img className="carouselImage" src={Card2} />
        <img className="carouselImage" src={Card3} />
      </Carousel>
      </div>



      {/* <Grid className={classes.container} container spacing={3}>
      <div className="oneCard">
        {items.map((item) => (
          <Grid className={classes.grid} key={item._id} item xs={12} sm={2}>
            <Item item={item} userInfo={userInfo}/>
          </Grid>
          ))}
        </div>
        </Grid> */}

      <div className="barContainer">
        <div className="copyContainer">
          <h1 className="copy">Decentralized renting platform.</h1>
        </div>
        <button className="button" onClick={handleRedirect}>GET STARTED</button>
      </div>
    </div>

  )
}