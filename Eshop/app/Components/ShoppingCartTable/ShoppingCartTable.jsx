import React from 'react'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import {Table, Button} from 'reactstrap'
import ShoppingCartItem from './ShoppingCartItem'
import {incrementQuantity} from '../../Redux/actions/ShoppingCartActions'


class ShoppingCartTable extends React.Component {

    handleQuantityIncrement(quantityFieldId){
        this.props.dispatchIncrementQuantity(quantityFieldId)
    }

    render() {
        const {cartItemList} = this.props

        const cartItems = cartItemList.map(cartItem => {
            return (
                <ShoppingCartItem 
                    key={cartItem.id}
                    id={cartItem.id}
                    imagePath={cartItem.imagePath}
                    title={cartItem.title}
                    price={cartItem.price}
                    quantity={cartItem.quantity}
                    incrementQuantity={this.handleQuantityIncrement.bind(this)}
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
    (dispatch) => bindActionCreators({
        dispatchIncrementQuantity: incrementQuantity
    },
    dispatch)
)(ShoppingCartTable)
