import axios from "axios";

const url = `http://54.254.145.250/items`; // ec2 deploy
// const url = "https://renty.herokuapp.com/items";  // heroku deploy
// const url = `http://localhost:4000/items`; // local deploy

const fetchItemsAPI = () => axios.get(url);
const createItemAPI = (newItem) => axios.post(url, newItem);
const updateItemAPI = (id, updatedItem) => axios.patch(`${url}/${id}`, updatedItem);
const deleteItemAPI = (id) => axios.delete(`${url}/${id}`)
const fetchItemsBySearchAPI = (searchQuery) => axios.get(`${url}/search?searchQuery=${searchQuery.search || 'none'}`)

export const getItems = () => async (dispatch) => {
  try {
    const { data } = await fetchItemsAPI();
    dispatch({ type: "FETCH_ALL", payload: data });
  } catch (err) {
    console.log(err)
  }
}

export const createItem = (item) => async (dispatch) => {
  try {
    const { data } = await createItemAPI(item);
    dispatch({ type: "CREATE", payload: data });
  } catch (err) {
    console.log(err)
  }
}

export const updateItem = (id, post) => async (dispatch) => {
  try {
    const { data } = await updateItemAPI(id, post);
    dispatch({ type: "UPDATE", payload: data });
  } catch (err) {
    console.log(err)
  }
}

export const deleteItem = (id) => async (dispatch) => {
  try {
    await deleteItemAPI(id);
    dispatch({ type: "DELETE", payload: id })
  } catch (err) {
    console.log(err)
  }
}

export const getItemsBySearch = (searchQuery) => async (dispatch) => {
  try {
    const { data: { data } } = await fetchItemsBySearchAPI(searchQuery);
    dispatch({ type: "FETCH_BY_SEARCH", payload: data });
    console.log('data:', data)
  } catch (err) {
    console.log(err)
  }
}