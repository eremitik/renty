import React from 'react';
import { useHistory } from "react-router-dom";
import Carousel from '@brainhubeu/react-carousel';
import '@brainhubeu/react-carousel/lib/style.css';
import Card1 from '../../images/card1.png';
import Card2 from '../../images/card2.png';
import Card3 from '../../images/card3.png';
import './Home.css';

export default function BottomBar () {

  const history = useHistory();

  const handleRedirect = () => {
    history.push('/login')
  }

  return (
    <div>
      <div>
      <h2 className="logo">R</h2>
      <a href="https://twitter.com/eremitik">
        <img className="img" src="https://i.ibb.co/Wnxq2Nq/twitter.png" alt="twitterlogo"/>
      </a>
      </div>

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

      <div className="carousel">
      <Carousel plugins={['arrows']}>
        <img className="carouselImage" src={Card1} alt="democard"/>
        <img className="carouselImage" src={Card2} alt="democard"/>
        <img className="carouselImage" src={Card3} alt="democard"/>
      </Carousel>
      </div>
      </div>

      <div className="barContainer">
        <div className="copyContainer">
          <h1 className="copy">Decentralized renting platform.</h1>
        </div>
        <button className="button" onClick={handleRedirect}>GET STARTED</button>
      </div>
    </div>

  )
}