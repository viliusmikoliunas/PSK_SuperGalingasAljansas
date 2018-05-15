import sampleData from '../../Components/ItemTable/sampleData'
import ItemTableActions from '../actionTypes/ItemTableActions'


const initialState = {
    items: []
}

export default (state = initialState, action) => {
    switch (action.type){
        case ItemTableActions.LOAD_ITEMS:
            return {
                ...state,
                items: action.items
            }
        default:
            return state
    }
}
