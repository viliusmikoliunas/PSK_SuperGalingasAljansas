import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import loadItems from '../../Redux/actions/ItemTableActions'
import { Table } from 'reactstrap'
import ItemRow from './ItemRow/ItemRow'
import Pagination from '../Pagination/Pagination'

import {getUserRoleFromToken} from '../../FunctionalComponents/jwt/parseJwt'
import QuantityInput from '../QuantityInput/QuantityInput';

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
      htmlItems.push(<ItemRow key={items[rowNumber].id} item={items[rowNumber]}/>);
    }

    const isAdmin = getUserRoleFromToken() === 'Admin'

    const quantityHeader = isAdmin ? null : <th>Quantity</th>
    const buttonHeader = isAdmin ? null : <th></th>


    return (
      <div className="itemTable">
        <Table responsive>
          <thead>
            <tr>
              <th></th>
              <th>Title</th>
              <th>Cost</th>
              {quantityHeader}
              {buttonHeader}
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
