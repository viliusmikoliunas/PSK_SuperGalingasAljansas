import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import loadItems from '../../Redux/actions/ItemTableActions'
import { Table } from 'reactstrap'
import ItemRow from './ItemRow/ItemRow'


class ItemTable extends React.Component {

  componentDidMount(){
    this.props.dispatchLoadItems()
  }

  render() {
    const htmlItems = [];
    const {items} = this.props
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
              <th>Traits</th>
            </tr>
          </thead>
          <tbody>
            {htmlItems}
          </tbody>
        </Table>
      </div>
    )
  }
}

export default connect(
    (state) => ({
        items: state.ItemTableReducer.items
    }),
    (dispatch) => bindActionCreators({
        dispatchLoadItems: loadItems
    }
    ,dispatch)
)(ItemTable)
