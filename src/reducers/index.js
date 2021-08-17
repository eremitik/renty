import { combineReducers } from "redux";

const items = (items = [], action) => {
  switch (action.type) {
    case "FETCH_ALL":
      return action.payload;
    case "CREATE":
      return [...items, action.payload];
    case "UPDATE":
      return items.map((item) => item._id === action.payload._id ? action.payload : item)
    case "DELETE":
      return items.filter((item) => item._id !== action.payload)
    case "FETCH_BY_SEARCH":
      return action.payload;
    default:
      return items;
  }
}

export default combineReducers({ items })