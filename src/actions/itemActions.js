import axios from 'axios'
import {
  ITEM_CREATE,
  ITEM_REQUEST_ALL,
  ITEM_UPDATE,
  ITEM_DELETE,
  ITEM_REQUEST_SEARCH,
  // CREATE_ORDER,
  // POST_ORDER
} from '../types/itemTypes.js'

// const url = "/items"; // local deploy
const url = "http://localhost:4000/items"; // local deploy

const fetchItemsAPI = () => axios.get(url);
const createItemAPI = (newItem) => axios.post(url, newItem);
const updateItemAPI = (id, updatedItem) => axios.patch(`${url}/${id}`, updatedItem);
const deleteItemAPI = (id) => axios.delete(`${url}/${id}`)
const fetchItemsBySearchAPI = (searchQuery) => axios.get(`${url}/search?searchQuery=${searchQuery.search || 'none'}`)
// const createOrderAPI = (newOrder) => axios.post(`${url}/${'order'}`, newOrder);


export const getItems = () => async (dispatch) => {
  try {
    const { data } = await fetchItemsAPI();
    dispatch({ type: ITEM_REQUEST_ALL, payload: data });
  } catch (err) {
    console.log(err)
  }
}

export const createItem = (item) => async (dispatch) => {
  try {
    const { data } = await createItemAPI(item);
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
    console.log('data:', data)
  } catch (err) {
    console.log(err)
  }
}

// // Order for REDUX 
// export const createOrder = (item) => (dispatch) => {
//   try {
//     const data = item;
//     dispatch({ type: CREATE_ORDER, payload: data });
//   } catch (err) {
//     console.log(err)
//   }
// }

// // Order to post to MongoDB
// export const postOrder = (order) => async (dispatch) => {
//   try {
//     const data = await createOrderAPI(order)
//     dispatch({ type: POST_ORDER, payload: data });
//   } catch (err) {
//     console.log(err)
//   }

// }
