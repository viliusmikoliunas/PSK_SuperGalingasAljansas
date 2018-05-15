import React from 'react'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import {Table, Button} from 'reactstrap'
import loadItem from '../../Redux/actions/ItemViewActions'

import collectionToString from '../../FunctionalComponents/formatting/collectionToString'

class ItemView extends React.Component {

    componentDidMount() {
        const {itemList, dispatchLoadItem, itemId} = this.props
        dispatchLoadItem(itemList, itemId)
    }

    render() {
        const {pictureLocation, title, cost, description, categories, traits} = this.props.item
        return (
            <Table responsive className="itemViewTable">
                <tbody className="itemViewTable-infoBody">
                    <tr>
                        <td rowSpan="5">
                            <img src={pictureLocation}/>
                        </td>
                        <td>{title}</td>
                    </tr>
                    <tr>
                        <td>Cost: {cost} €</td>
                    </tr>
                    <tr>
                        <td>{description || '"No description was provided for this item"'}</td>
                    </tr>
                    <tr>
                        <td>                        
                            <p>Categories:</p>
                            {collectionToString(categories) || "This item doesn't belong to any category"}
                        </td>
                    </tr>
                    <tr>
                    <td>                        
                        <p>Traits:</p>
                        {collectionToString(traits) || "This item doesn't have any traits"}
                    </td>
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
        itemList: state.ItemTableReducer.items,
        item: state.ItemViewReducer.item
    }),
    (dispatch) => bindActionCreators({
        dispatchLoadItem: loadItem
    }
    ,dispatch)
)(ItemView)
