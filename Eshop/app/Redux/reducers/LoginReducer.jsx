import loginActionTypes from '../actionTypes/LoginActionTypes'

const initialState = {
  loggedIn: localStorage['jwtToken'] != null,
  loggingIn: false
}

export default (state = initialState, action) => {
  switch (action.type) {
    case loginActionTypes.LOGIN_REQUEST:
      return {
        loggingIn: true
      }
    case loginActionTypes.LOGIN_SUCCESS:
      return {
        loggedIn: true,
        loggingIn: false,
        error: null
      }
    case loginActionTypes.LOGIN_FAILURE:
      return {
        loggingIn: false,
        error: action.error
      }
    case loginActionTypes.LOGOUT:
      return {
        loggedIn: false
      }
    default:
      return state
  }
}
