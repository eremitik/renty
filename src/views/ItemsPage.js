import React from 'react';
import Items from "../components/Items";
// import Search from "../components/Search";
import './Views.css';

export default function ItemsPage() {

    return (
        <div className="sides">
            {/* {user && user.name ? <p>Hello, {user.name}</p> : "Please log in to rent and create rentals."} */}
            {/* <Search /> */}
            <br></br>
            <br></br>
            <br></br>
            <Items />
        </div>
    );
}