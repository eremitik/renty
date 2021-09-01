import React from "react";
// import { useSelector } from "react-redux";
import backgroundVideo from '../video/flashinglightsshort.mp4';
import './Views.css';

export default function HomePage() {

    // const user = useSelector(state => state.userLogin.userInfo)

    return (
      <div>
        {/* {user && user.name ? <h1>Welcome to RENTY, {user.name}</h1> : <h1>Welcome to RENTY! Please sign up today to start renting.</h1>} */}
        <video autoPlay loop muted id='video'>
          <source src={backgroundVideo} type="video/mp4"/>
        </video>
      </div>
    )
}