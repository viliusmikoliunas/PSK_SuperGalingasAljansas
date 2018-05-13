import loginActionTypes from '../actionTypes/RegisterActionTypes'

const initialState = {
  
}

export default (state = initialState, action) => {
  switch (action.type) {
    case loginActionTypes.REGISTER_SUCCESS:
      return {
        error: null
      }
    case loginActionTypes.REGISTER_FAILURE:
      return {
        error: action.error
      }
    default:
      return state
  }
}
