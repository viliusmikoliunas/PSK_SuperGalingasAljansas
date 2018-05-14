import React from 'react'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import {Button,InputGroup,InputGroupAddon,Input} from 'reactstrap'
import {incrementQuantity, decrementQuantity, removeFromCart} from '../../Redux/actions/ShoppingCartActions'


const ShoppingCartItem = (props) => {
	const {id, imagePath, title, price, quantity, 
		dispatchIncrementQuantity, dispatchDecrementQuantity, dispatchRemoveItemFromCart} = props
    return(
        <tr>
            <td><img src={imagePath} height="100" height="100"/></td>
            <td>{title}</td>
            <td>{price}</td>
            <td>      
			<InputGroup>
				<InputGroupAddon addonType="prepend"><Button onClick={() => dispatchDecrementQuantity(id)}>-</Button></InputGroupAddon>
				<Input readOnly disabled value={quantity}></Input>
				<InputGroupAddon addonType="append"><Button onClick={() => dispatchIncrementQuantity(id)}>+</Button></InputGroupAddon>
			</InputGroup>
            </td>
			<td><Button onClick={() => dispatchRemoveItemFromCart(id)}>Remove</Button></td>
        </tr>
    )
}
export default connect(
    (state) => ({
        cartItemList: state.ShoppingCartReducer.shoppingCart
    }),
    (dispatch) => bindActionCreators({
        dispatchIncrementQuantity: incrementQuantity,
        dispatchDecrementQuantity: decrementQuantity,
        dispatchRemoveItemFromCart: removeFromCart
    },
    dispatch)
)(ShoppingCartItem)
