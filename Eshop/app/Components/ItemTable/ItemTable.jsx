import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import loadItems from '../../Redux/actions/ItemTableActions'
import { Table } from 'reactstrap'
import ItemRow from './ItemRow/ItemRow'
import Pagination from '../Pagination/Pagination'


class ItemTable extends React.Component {
  constructor(){
    super()
    this.state = {
      pageLimit: 20
    }
  }

  componentDidMount(){
    this.props.dispatchLoadItems(1, this.state.pageLimit)
  }

  render() {
    const htmlItems = [];
    const {items, allItemCount} = this.props
    for (const rowNumber in items ){
      htmlItems.push(<ItemRow key={items[rowNumber].id} {...items[rowNumber]}/>);
    }

    return (
      <div className="itemTable">
        <Table responsive>
          <thead>
            <tr>
              <th></th>
              <th>Title</th>
              <th>Cost</th>
              <th>Category</th>
              <th>Properties</th>
            </tr>
          </thead>
          <tbody>
            {htmlItems}
          </tbody>
        </Table>
        <Pagination
          allElementCount={allItemCount}
          loadListFunction={this.props.dispatchLoadItems}
          limit={this.state.pageLimit}
        />
      </div>
    )
  }
}

export default connect(
    (state) => ({
        items: state.ItemTableReducer.items,
        allItemCount: state.ItemTableReducer.numberOfAllItems
    }),
    (dispatch) => bindActionCreators({
        dispatchLoadItems: loadItems
    }
    ,dispatch)
)(ItemTable)
