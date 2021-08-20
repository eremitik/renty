import axios from "axios";

// const url = "https://rentyhq.herokuapp.com/items";  //live deploy
const url = "http://localhost:4000/items"; // local deploy

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
