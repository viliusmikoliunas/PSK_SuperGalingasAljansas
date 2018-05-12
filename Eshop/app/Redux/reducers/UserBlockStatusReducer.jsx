import UserBlockActionTypes from '../actionTypes/UserBlockActionTypes'


const initialState = {

}

export default (state = initialState, action) => {
    switch(action.type){
        case (UserBlockActionTypes.BLOCK):
            return {
                ...state,
                blockStatus: true
            }
        case ('UNBLOCK_USER'):
            return {
                ...state,
                blockStatus: false
            }
        default:
            return state
    }
}
