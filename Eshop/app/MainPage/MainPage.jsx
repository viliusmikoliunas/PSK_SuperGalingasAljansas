import React from 'react';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import { loadItems } from './MainPageActions'
import { Table } from 'reactstrap';

class MainPage extends React.Component {
  render() {
    return (
    <div className="itemTable">
      <Table responsive>
        <thead>
          <tr>
            <th>Thumbnail</th>
            <th>Title</th>
            <th>Category</th>
            <th>Cost</th>
            <th>Traits</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th scope="row">1</th>
            <td>Table cell</td>
            <td>Table cell</td>
            <td>Table cell</td>
            <td>Table cell</td>
          </tr>
          <tr>
            <th scope="row">2</th>
            <td>Table cell</td>
            <td>Table cell</td>
            <td>Table cell</td>
            <td>Table cell</td>
          </tr>
          <tr>
            <th scope="row">3</th>
            <td>Table cell</td>
            <td>Table cell</td>
            <td>Table cell</td>
            <td>Table cell</td>
          </tr>
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
