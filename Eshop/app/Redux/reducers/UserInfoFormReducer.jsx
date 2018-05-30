const initialState = {
    
}

export default (state = initialState, action) => {
    switch(action.type){

        case 'LOAD_EDIT_USER_INFO_FORM':
            return {
                ...state,
                userInfo: action.userInfo
            }
        
        case 'ERROR_EDIT_USER_INFO_FORM':
            return{
                ...state,
                error: action.error
            }

        default:
            return state
    }
}
