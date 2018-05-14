import React from 'react'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import {Table, Button} from 'reactstrap'
import ShoppingCartItem from './ShoppingCartItem'
import toFixed from '../../FunctionalComponents/formatting/toFixed'


class ShoppingCartTable extends React.Component {

    componentWillUnmount(){
        //save changes
    }

    render() {
        const {cartItemList} = this.props
        let total = 0
        const cartItems = cartItemList.map(cartItem => {
            total += cartItem.price*cartItem.quantity
            return (
                <ShoppingCartItem 
                    key={cartItem.id}
                    id={cartItem.id}
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
                        <td>{toFixed(total,2)}</td>
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

    },
    dispatch)
)(ShoppingCartTable)
