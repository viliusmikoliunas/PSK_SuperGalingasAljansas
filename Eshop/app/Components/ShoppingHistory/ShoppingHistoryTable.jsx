import React from 'react'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import {Table, Modal} from 'reactstrap'
import ShoppingHistoryCard from './ShoppingHistoryCard'

class ShoppingHistoryTable extends React.Component {

    componentDidMount() {
        //this.props.dispatchLoadOrders()
    }

    handleOrderConfirmation(orderId){
        //this.props.dispatchConfirmOrder(orderId)
    }

    render() {
        return (
            <Table responsive>
                <thead>
                    <tr>
                        <th>Date</th>
                        <th>Items</th>      
                        <th>Cost(eur)</th>      
                    </tr>
                </thead>
                <tbody>
                    <ShoppingHistoryCard/>
                    <ShoppingHistoryCard/>
                    <ShoppingHistoryCard/>
                </tbody>
            </Table>
        )
    }
}

export default connect(
    (state) => ({
        //orders: state.OrderListReducer.orders
    }),
    (dispatch) => bindActionCreators({
        //dispatchLoadOrders: loadOrders,
        //dispatchConfirmOrder: confirmOrder
    }
    ,dispatch)
)(ShoppingHistoryTable)
