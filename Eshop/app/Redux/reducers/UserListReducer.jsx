import UserListActionTypes from '../actionTypes/UserListActionTypes'


const initialState = {
    userList: []
}

export default (state = initialState, action) => {
    switch(action.type){
        case (UserListActionTypes.LOAD_LIST):{
            return {
                ...state,
                userList: action.userList
            }
        }
        default:
            return state
    }
}
