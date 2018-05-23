const initialState = {

}

export default (state = initialState, action) => {
    switch(action.type){

        case 'LOAD_EDIT_USER_INFO_FORM':
            return {
                userInfo: action.userInfo
            }

        default:
            return state
    }
}
