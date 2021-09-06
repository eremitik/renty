import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'

import {
    userLoginReducer,
    userRegisterReducer,
} from './reducers/userReducers'

import {
    itemCreateReducer,
    itemRequestAllReducer,
    itemUpdateReducer,
    itemDeleteReducer,
} from './reducers/itemReducers'

import {
    orderRequestAllReducer,
    createOrderReducer,
    postOrderReducer,
} from './reducers/orderReducers'

const reducer = combineReducers({
    userLogin: userLoginReducer,
    userRegister: userRegisterReducer,
    itemCreate: itemCreateReducer,
    itemList: itemRequestAllReducer,
    itemUpdate: itemUpdateReducer,
    itemDelete: itemDeleteReducer,
    createOrder: createOrderReducer,
    postOrder: postOrderReducer,
    orderList: orderRequestAllReducer,
})

const userInfoFromStorage = localStorage.getItem('userInfo')
    ? JSON.parse(localStorage.getItem('userInfo'))
    : null

const initialState = {
    userLogin: { userInfo: userInfoFromStorage },
}



const middleware = [thunk]

const store = createStore(
    reducer,
    initialState,
    composeWithDevTools(applyMiddleware(...middleware))
)

export default store