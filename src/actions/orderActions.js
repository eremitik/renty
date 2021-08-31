import axios from 'axios'
import {
  ORDER_REQUEST_ALL,
  CREATE_ORDER,
  POST_ORDER
} from '../types/orderTypes.js'
import dotenv from "dotenv";
dotenv.config();


let url;
(process.env.REACT_APP_ENVIRONMENT === "PROD") ? (url = "/order") : (url = "http://localhost:4000/order")

const fetchOrdersAPI = () => axios.get(url);
const createOrderAPI = (newOrder) => axios.post(url, newOrder);


export const getOrder = () => async (dispatch) => {
  try {
    const { data } = await fetchOrdersAPI();
    dispatch({ type: ORDER_REQUEST_ALL, payload: data });
  } catch (err) {
    console.log(err)
  }
}

// Order info for booking page 
export const createOrder = (item) => (dispatch) => {
  try {
    const data = item;
    dispatch({ type: CREATE_ORDER, payload: data });
  } catch (err) {
    console.log(err)
  }
}

// Order to post to MongoDB
export const postOrder = (order) => async (dispatch) => {
  try {
    const data = await createOrderAPI(order)
    dispatch({ type: POST_ORDER, payload: data });
  } catch (err) {
    console.log(err)
  }
}
