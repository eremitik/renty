import axios from 'axios'
import {
  ITEM_CREATE,
  ITEM_REQUEST_ALL,
  ITEM_UPDATE,
  ITEM_DELETE,
  ITEM_REQUEST_SEARCH,
} from '../types/itemTypes.js'
import dotenv from "dotenv";

dotenv.config();

let url;
(process.env.REACT_APP_ENVIRONMENT === "PROD") ? (url = "http://13.212.157.177/items/") : (url = "http://localhost:4000/items")

const fetchItemsAPI = () => axios.get(url);
const createItemAPI = (newItem) => { axios.post(url, newItem) };
const updateItemAPI = (id, updatedItem) => axios.patch(`${url}/${id}`, updatedItem);
const deleteItemAPI = (id) => axios.delete(`${url}/${id}`)
const fetchItemsBySearchAPI = (searchQuery) => axios.get(`${url}/search?searchQuery=${searchQuery.search || 'none'}`)

export const getItems = () => async (dispatch) => {
  try {
    let { data } = await fetchItemsAPI();
    data = data.reverse()

    dispatch({ type: ITEM_REQUEST_ALL, payload: data });
  } catch (err) {
    console.log(err)
  }
}

export const createItem = (item) => async (dispatch) => {
  try {
    const data = await createItemAPI(item);
    dispatch({ type: ITEM_CREATE, payload: data });
  } catch (err) {
    console.log(err)
  }
}

export const updateItem = (id, post) => async (dispatch) => {
  try {
    const { data } = await updateItemAPI(id, post);
    dispatch({ type: ITEM_UPDATE, payload: data });
  } catch (err) {
    console.log(err)
  }
}

export const deleteItem = (id) => async (dispatch) => {
  try {
    await deleteItemAPI(id);
    dispatch({ type: ITEM_DELETE, payload: id })
  } catch (err) {
    console.log(err)
  }
}

export const getItemsBySearch = (searchQuery) => async (dispatch) => {
  try {
    const { data: { data } } = await fetchItemsBySearchAPI(searchQuery);
    dispatch({ type: ITEM_REQUEST_SEARCH, payload: data });
  } catch (err) {
    console.log(err)
  }
}