import React from 'react'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import {Table, Button} from 'reactstrap'
import loadUsers from '../../Redux/actions/UserListActions'
import ShoppingCartItem from './ShoppingCartItem'

class ShoppingCartTable extends React.Component {
    constructor(props) {
        super(props)
    }

    componentDidMount() {
        //this.props.dispatchLoadList()
    }

    render() {
        const {cartItemList} = this.props
        let key = 1

        const cartItems = cartItemList.map(cartItem => {
            return (
                <ShoppingCartItem 
                    key={key++}
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
                        <th></th>
                        <th>Title</th>
                        <th>Unit Price</th>
                        <th>Quantity</th>
                        <th>Remove Item?</th>
                    </tr>
                </thead>
                <tbody>
                    {cartItems}
                </tbody>
                <tbody>
                    <tr>
                        <td/>
                        <td/>
                        <td/>
                        <td>Total Price</td>
                        <td>10</td>
                    </tr>
                </tbody>
            </Table>
        )
    }
}

export default connect(
    (state) => ({
        cartItemList: state.ShoppingCartReducer.shoppingCart
    }),
    null
)(ShoppingCartTable)
