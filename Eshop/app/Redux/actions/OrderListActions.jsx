import generateRequestWithAuth from '../../FunctionalComponents/httpRequests/generateRequestWithAuth'
import OrderListActionTypes from '../actionTypes/OrderListActionTypes'
import sampleData from '../../Components/OrderTable/sampleData'


const loadOrders = () => (dispatch) => {
    dispatch({
        type: OrderListActionTypes.LOAD_ORDERS,
        orders: sampleData
    })
}

export default loadOrders

const address = 'api/orders'


export const confirmOrder = (orderId) => (dispatch) => {
    const reqBody = {
        id: orderId,
        confirmed: true
    }

    const request = generateRequestWithAuth('PUT', reqBody)

    //finish after api is made
    dispatch({
        type: OrderListActionTypes.CONFIRM_ORDER,
        orderId: orderId
    })
}
