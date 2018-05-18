import OrderListActionTypes from '../actionTypes/OrderListActionTypes'


const initialState = {
    orders: []
}

export default (state = initialState, action) => {
    switch (action.type){

        case OrderListActionTypes.LOAD_ORDERS:
            return {
                ...state,
                orders: action.orders
            }

        default:
            return state
    }
}
