import generateRequestWithAuth from '../../FunctionalComponents/httpRequests/generateRequestWithAuth'
import OrderListActionTypes from '../actionTypes/OrderListActionTypes'
import sampleData from '../../Components/OrderTable/sampleData'

const address = '/api/orders'

const loadOrders = () => (dispatch) => {
    const request = generateRequestWithAuth('GET', null)
    fetch(address, request)
        .then(response => {
            if (response.ok){
                response.json()
                    .then(jsonResponse => dispatch({
                        type: OrderListActionTypes.LOAD_ORDERS,
                        orders: jsonResponse
                    }))
            }
            else response.text()
                .then(responseText => alert(responseText))
        })
}

export default loadOrders


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
