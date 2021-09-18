import axios from 'axios';
import {
    USER_LOGIN,
    USER_LOGOUT,
    USER_REGISTER,
} from '../types/userTypes.js';

// User Registration
export const register = (name, email, password) => async (dispatch) => {
    try {
        const config = {
            headers: {
                'Content-Type': 'application/json',
            },
        }

        const { data } = await axios.post(
            '/users/register',
            { name, email, password },
            config
        )

        dispatch({
            type: USER_REGISTER,
            payload: data,
        })

        dispatch({
            type: USER_LOGIN,
            payload: data,
        })

        localStorage.setItem('userInfo', JSON.stringify(data))
    } catch (error) {
        alert(error)
    }
}

// User Login
export const login = (email, password) => async (dispatch) => {
    try {

        const config = {
            headers: {
                'Content-Type': 'application/json',
            },
        }

        const { data } = await axios.post(
            '/users/login',
            { email, password },
            config
        )

        dispatch({
            type: USER_LOGIN,
            payload: data,
        })

        localStorage.setItem('userInfo', JSON.stringify(data))
    } catch (error) {
        alert(error)
    }
}

// User Logout
export const logout = () => (dispatch) => {
    localStorage.removeItem('userInfo')
    dispatch({ type: USER_LOGOUT })
    document.location.href = '/#/'
}