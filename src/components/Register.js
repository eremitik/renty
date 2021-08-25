import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useHistory } from 'react-router-dom'
import { register } from '../actions/userActions.js'


function Register() {

    const dispatch = useDispatch();
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const history = useHistory()

    const userRegister = useSelector((state) => state.userRegister)
    const { userInfo } = userRegister
  

    useEffect(() => {
        if (userInfo) {
            history.push('/main')
        }
    }, [history, userInfo])

    const registerSubmit = async (e) => {
        e.preventDefault()
        try {
            dispatch(register(name, email, password))
            // window.location.href = "/main";
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