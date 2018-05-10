import sampleData from '../../Components/ItemTable/sampleData'

const initialState = {
    items: sampleData
}

export default (state = initialState, action) => {
    switch (action.type){
        case 'LOAD_ITEMS':
            return {
                ...state,
                items: action.items
            }
        default:
            return state
    }
}
