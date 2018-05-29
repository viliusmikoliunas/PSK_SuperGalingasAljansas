const initialState = {
    historyList: []
}

export default (state = initialState, action) => {
    switch(action.type){
        case 'LOAD_SHOPPING_HISTORY':
            return {
                ...state,
                historyList: action.historyList
            }

        default:
            return state
    }
}