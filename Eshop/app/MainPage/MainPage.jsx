import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import { loadItems } from './MainPageActions'
import { Table } from 'reactstrap'
import ItemRow from './ItemRow/ItemRow'

class MainPage extends React.Component {
  render() {
    const htmlItems = [];
    const {items} = this.props;
    for(let i = 0; i < 5; i++) {
      for (const rowNumber in items ){
        htmlItems.push(<ItemRow key={i+rowNumber} params = {items[rowNumber]}/>);
      }
    }

    return (
    <div className="itemTable">
      <Table responsive>
        <thead>
          <tr>
            <th></th>
            <th>Title</th>
            <th>Category</th>
            <th>Cost</th>
            <th>Traits</th>
          </tr>
        </thead>
        <tbody>
          {htmlItems}
        </tbody>
      </Table>
    </div>
    );
  }
}
export default connect(
    (state) => ({
        items: state.MainPageReducer.items
    }),
    (dispatch) => bindActionCreators({
        dispatchLoadItems: loadItems
    }
    ,dispatch)
)(MainPage)
