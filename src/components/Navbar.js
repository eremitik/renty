// import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux'
// import { Context } from "../Store";
// import { useHistory } from "react-router";
import { logout } from '../actions/userActions.js'

export default function Navbar() {
    const dispatch = useDispatch()

    const logoutFunct = () => {

        localStorage.setItem("jwt", "");
        dispatch(logout());
        window.location.reload();
    };

    const userLogin = useSelector((state) => state.userLogin)
    const { userInfo } = userLogin

    return (
        <div>
            {userInfo ? (
                <>
                    <Link to="/notes">Go to notes</Link>
                    <button onClick={logoutFunct}>Log out</button>
                </>
            ) : (
                <>
                    <Link to="/register">Register</Link> <br />
                    <Link to="/login">Login</Link>
                </>
            )}
        </div>
    );
}