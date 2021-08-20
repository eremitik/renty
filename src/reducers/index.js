// import { combineReducers } from "redux";

// const items = (items = [], action) => {
//   switch (action.type) {
//     case "FETCH_ALL":
//       return action.payload;
//     case "CREATE":
//       return [...items, action.payload];
//     default:
//       return items;
//   }
// };

const Reducer = (state, action) => {
  switch (action.type) {
    case "SET_USER":
      return {
        ...state,
        user: action.payload,
      };
    case "SET_JWT":
      return {
        ...state,
        token: action.payload,
      };
    case "UNSET_USER_AND_TOKEN":
      return {
        ...state,
        token: "",
        user: {},
      };
    default:
      return state;
  }

}
export default Reducer;

// export default combineReducers({ items, users })