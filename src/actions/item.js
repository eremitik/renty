import axios from "axios";

const url = "https://rentyhq.herokuapp.com/posts";
// const url = "http://localhost:5000/items";

const fetchItemsAPI = () => axios.get(url);
const createItemAPI = (newItem) => axios.post(url, newItem);

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
