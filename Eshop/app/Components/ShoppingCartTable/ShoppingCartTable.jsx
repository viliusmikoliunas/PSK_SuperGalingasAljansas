import React from 'react'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import {Table, Button} from 'reactstrap'
import loadUsers from '../../Redux/actions/UserListActions'
import changeBlockStatus from '../../Redux/actions/UserBlockActions'
import ShoppingCartItem from './ShoppingCartItem'

class ShoppingCartTable extends React.Component {
    constructor(props) {
        super(props)
    }

    componentDidMount() {
        //this.props.dispatchLoadList()
    }

    render() {
        //const {cartItemList} = this.props
        const cartItemList = [{
            imagePath: 'https://www.ikea.com/PIAimages/0238241_PE377689_S5.JPG',
            title: 'Kedute',
            price: 10.56,
            quantity: 2
        }]
        const cartItems = cartItemList.map(cartItem => {
            return (
                <ShoppingCartItem 
                    imagePath={cartItem.imagePath}
                    title={cartItem.title}
                    price={cartItem.price}
                    quantity={cartItem.quantity}
                />
            )
        })
        return (
            <Table responsive>
                <thead>
                    <tr>
                        <th>Image</th>
                        <th>Title</th>
                        <th>Unit Price</th>
                        <th>Quantity</th>
                        <th>Total Price</th>
                    </tr>
                </thead>
                <tbody>
                    {cartItems}
                </tbody>
            </Table>
        )
    }
}
export default connect(
    (state) => ({
        userList: state.UserListReducer.userList
    }),
    (dispatch) => bindActionCreators({
        dispatchLoadList: loadUsers,
        dispatchBlock: changeBlockStatus
    }
    ,dispatch)
)(ShoppingCartTable)
