import React, { useState } from 'react'
import { useContext } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { storeToken } from "../helper"
import { Context } from "../Store";

function Register() {

    const [state, dispatch] = useContext(Context);
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const registerSubmit = async (e) => {
        e.preventDefault()
        try {
            const response = await axios.post('/auth/register', {
                name,
                email,
                password
            })
            localStorage.setItem('jwt', response.data.token)
            storeToken(dispatch)
            window.location.href = "/items";
        } catch (err) {
            alert(err.response.data.msg)
        }
    }

    return (
        <div className="login-page" >
            <form onSubmit={registerSubmit}>
                <h2>Register</h2>
                <input type="text" name="name" required
                    placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} />

                <input type="email" name="email" required
                    placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />

                <input type="password" name="password" required autoComplete="on"
                    placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />

                <div className="row">
                    <button type="submit">Register</button>
                    <Link to="/login">Login</Link>
                </div>
            </form>
        </div>
    )
}

export default Register