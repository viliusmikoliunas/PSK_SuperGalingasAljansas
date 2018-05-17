import React from 'react'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import {Table} from 'reactstrap'


class OrderTable extends React.Component {

    componentDidMount() {
    }

    render() {
        const orders = []
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
                    {orders}
                </tbody>
            </Table>
        )
    }
}

export default connect(
    (state) => ({
        
    }),
    (dispatch) => bindActionCreators({

    }
    ,dispatch)
)(OrderTable)
