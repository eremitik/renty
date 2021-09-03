import React from "react";
import backgroundVideo from '../video/flashinglightsshort.mp4';
import './Views.css';


export default function HomePage() {

    return (
      <div>
        <video autoPlay loop muted id='video'>
          <source src={backgroundVideo} type="video/mp4"/>
        </video>
      </div>
    )
}