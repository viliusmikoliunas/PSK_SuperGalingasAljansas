import React from 'react'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import {Table, Modal} from 'reactstrap'
import ShoppingHistoryCard from './ShoppingHistoryCard'
import loadShoppingHistory from '../../Redux/actions/ShoppingHistoryActions'


class ShoppingHistoryTable extends React.Component {

    componentDidMount() {
        this.props.dispatchLoadHistory()
    }

    render() {
        const {historyList} = this.props
        const historyElements = historyList.map(element => {
            return (
                <ShoppingHistoryCard
                    cost = {element.cost}
                    date = {element.date}
                    key = {element.date}
                    items = {element.items}
                />
            )
        })



        console.log(historyList)
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
                    {historyElements}
                </tbody>
            </Table>
        )
    }
}

export default connect(
    (state) => ({
        historyList: state.ShoppingHistoryReducer.historyList
    }),
    (dispatch) => bindActionCreators({
        dispatchLoadHistory: loadShoppingHistory
    }
    ,dispatch)
)(ShoppingHistoryTable)
