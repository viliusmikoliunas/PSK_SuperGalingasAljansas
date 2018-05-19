import React from 'react'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import {Table, Modal} from 'reactstrap'
import Order from './Order'
import loadOrders, {confirmOrder} from '../../Redux/actions/OrderListActions'


class OrderTable extends React.Component {

    componentDidMount() {
        this.props.dispatchLoadOrders()
    }

    handleOrderConfirmation(orderId){
        this.props.dispatchConfirmOrder(orderId)
    }

    render() {
        const {orders} = this.props
        const orderList = orders.map(order => {
            return (
                <Order
                    key={order.Id}
                    id={order.Id}
                    username={order.Username}
                    date={order.Date}
                    items={order.Items}
                    ammount={order.Ammount}
                    paymentDate={order.PaymentDate}
                    review={order.Review}
                    confirmed={order.Confirmed}
                    onConfirm={this.handleOrderConfirmation.bind(this)}
                />
            )
        })

        return (
            <Table responsive>
                <thead>
                    <tr>
                        <th>Username</th>
                        <th>Date</th>
                        <th>Items</th>
                        <th>Ammount</th>
                        <th>Payment Date</th>
                        <th>Review</th>
                        <th>Confirm</th>       
                    </tr>
                </thead>
                <tbody>
                    {orderList}
                </tbody>
            </Table>
        )
    }
}

export default connect(
    (state) => ({
        orders: state.OrderListReducer.orders
    }),
    (dispatch) => bindActionCreators({
        dispatchLoadOrders: loadOrders,
        dispatchConfirmOrder: confirmOrder
    }
    ,dispatch)
)(OrderTable)
