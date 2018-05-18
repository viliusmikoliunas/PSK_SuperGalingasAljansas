import React from 'react'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import {Table, Modal} from 'reactstrap'
import Order from './Order'
import loadOrders from '../../Redux/actions/OrderListActions'


class OrderTable extends React.Component {

    componentDidMount() {
        this.props.dispatchLoadOrders()
    }

    render() {
        const {orders} = this.props
        const orderList = orders.map(order => {
            return (
                <Order
                    key={order.Username}
                    username={order.Username}
                    date={order.Date}
                    items={order.Items}
                    ammount={order.Ammount}
                    paymentDate={order.PaymentDate}
                    review={order.Review}
                    confirmed={order.Confirmed}
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
        dispatchLoadOrders: loadOrders
    }
    ,dispatch)
)(OrderTable)
