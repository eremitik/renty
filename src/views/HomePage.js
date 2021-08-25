import React from "react";
import { useSelector } from "react-redux";

export default function HomePage() {

    const user = useSelector(state => state.userLogin.userInfo)

    return (
      <div>
        {user && user.name ? <h1>Welcome to RENTY, {user.name}</h1> : <h1>Welcome to RENTY! Please sign up today to start renting.</h1>}
      </div>
    )
}