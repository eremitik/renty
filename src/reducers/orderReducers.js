import {
  ORDER_REQUEST_ALL,
  CREATE_ORDER,
  POST_ORDER
} from '../types/orderTypes.js'

export const orderRequestAllReducer = (state = { orders: [] }, action) => {
  switch (action.type) {
    case ORDER_REQUEST_ALL:
      return { orders: action.payload };
    default:
      return state;
  }
}

export const createOrderReducer = (state = {}, action) => {
  switch (action.type) {
    case CREATE_ORDER:
      return { tempOrder: action.payload };
    default:
      return state;
  }
};

// Post Order to MongoDB
export const postOrderReducer = (state = {}, action) => {
  switch (action.type) {
    case POST_ORDER:
      return { order: action.payload };
    default:
      return state;
  }
};