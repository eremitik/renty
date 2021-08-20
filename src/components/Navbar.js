import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { Context } from "../Store";
// import { useHistory } from "react-router";

export default function Navbar() {
    const [state, dispatch] = useContext(Context);

    const logout = () => {
        localStorage.setItem("jwt", "");
        dispatch("UNSET_USER_AND_TOKEN");
        window.location.reload();
    };

    return (
        <div>
            {state.user.id ? (
                <>
                    <Link to="/notes">Go to notes</Link>
                    <button onClick={logout}>Log out</button>
                </>
            ) : (
                <>
                    <Link to="/">Home</Link> <br />
                    <Link to="/register">Register</Link> <br />
                    <Link to="/login">Login</Link> <br />
                    <Link to="/main">Main</Link>
                </>
            )}
        </div>
    );
}