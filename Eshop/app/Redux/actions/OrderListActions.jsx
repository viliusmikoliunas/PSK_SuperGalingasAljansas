import OrderListActionTypes from '../actionTypes/OrderListActionTypes'
import sampleData from '../../Components/OrderTable/sampleData'


const loadOrders = () => (dispatch) => {
    dispatch({
        type: OrderListActionTypes.LOAD_ORDERS,
        orders: sampleData
    })
}

export default loadOrders