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
        case ItemViewActions.CHANGE_FIELD_VALUE:
            return {
                ...state,
                item: {
                    ...state.item,
                    [action.field]: action.value
                }
            }
        default:
            return state
    }
}
