import loginActionTypes from '../actionTypes/LoginActionTypes'

const initialState = {

}

export default (state = initialState, action) => {
  switch (action.type) {
    case loginActionTypes.LOGIN_REQUEST:
      return {
        loggingIn: true
      }
    case loginActionTypes.LOGIN_SUCCESS:
      return {
        loggingIn: false,
        error: null
      }
    case loginActionTypes.LOGIN_FAILURE:
      return {
        loggingIn: false,
        error: action.error
      }
    default:
      return state
  }
}
