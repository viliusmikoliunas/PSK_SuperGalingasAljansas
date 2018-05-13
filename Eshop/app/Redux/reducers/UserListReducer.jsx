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
        case (UserListActionTypes.BLOCK_USER):{
            return {
                ...state,
                userList: state.userList.map(user => {
                    if (user.username === action.username){
                        return {
                            ...user,
                            isBlocked: true
                        }
                    }
                    return user
                })
            }
        }
        default:
            return state
    }
}
