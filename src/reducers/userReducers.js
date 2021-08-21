import {
  USER_REGISTER,
  USER_LOGIN,
  USER_LOGOUT,
} from '../types/userTypes'

export const userRegisterReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_REGISTER:
      return { userInfo: action.payload }
    case USER_LOGOUT:
      return {}
    default:
      return state
  }
}

export const userLoginReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_LOGIN:
      return { userInfo: action.payload }
    case USER_LOGOUT:
      return {}
    default:
      return state
  }
}