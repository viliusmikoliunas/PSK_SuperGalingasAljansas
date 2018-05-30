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

        case (OrderListActionTypes.CONFIRM_ORDER):{
            return {
                ...state,
                orders: state.orders.map(order => {
                    if (order.id === action.orderId){
                        return {
                            ...order,
                            confirmed: true
                        }
                    }
                    return order
                })
            }
        }

        default:
            return state
    }
}
