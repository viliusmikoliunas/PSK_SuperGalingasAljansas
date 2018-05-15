import ItemViewActions from '../actionTypes/ItemViewActionTypes'


const initialState = {
    item: {}
}

export default (state = initialState, action) => {
    switch (action.type){
        case ItemViewActions.LOAD_ITEM:
            return{
                ...state,
                item: action.item
            }
        default:
            return state
    }
}
