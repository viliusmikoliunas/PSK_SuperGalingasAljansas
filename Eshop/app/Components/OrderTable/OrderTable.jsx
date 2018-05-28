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
                    key={order.id}
                    id={order.id}
                    username={order.username}
                    date={order.date}
                    items={order.items}
                    cost={order.cost}
                    paymentDate={order.paymentDate}
                    review={order.review}
                    confirmed={order.confirmed}
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
                        <th>Cost(€)</th>
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
