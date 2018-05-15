import React from 'react'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import {Table, Button} from 'reactstrap'


class ItemView extends React.Component {
    //first check if item was passed from above
    //if not then download item info now


    componentDidMount() {

    }

    render() {
        return (
            <Table responsive className="itemViewTable">
                <tbody className="itemViewTable-infoBody">
                    <tr>
                        <td rowSpan="5">IMAGE</td>
                        <td>Title</td>
                    </tr>
                    <tr>
                        <td>Cost</td>
                    </tr>
                    <tr>
                        <td>Description</td>
                    </tr>
                    <tr>
                        <td>Categories</td>
                    </tr>
                    <tr>
                        <td>Traits</td>
                    </tr>
                </tbody>
                <tbody className="itemViewTable-actionsBody">
                    <tr>
                        <td><Button>Add to cart</Button></td>
                    </tr>
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
)(ItemView)
