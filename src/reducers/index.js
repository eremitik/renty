import { combineReducers } from "redux";

const items = (items = [], action) => {
  switch (action.type) {
    case "FETCH_ALL":
      return action.payload;
    case "CREATE":
      return [...items, action.payload];
    default:
      return items;
  }
}

export default combineReducers({ items })