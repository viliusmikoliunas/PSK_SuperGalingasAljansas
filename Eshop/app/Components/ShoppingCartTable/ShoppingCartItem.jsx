import React, {Component} from 'react'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import {Link} from 'react-router-dom'
import {Button,InputGroup,InputGroupAddon,Input} from 'reactstrap'
import {updateQuantity, removeFromCart} from '../../Redux/actions/ShoppingCartActions'
import QuantityInput from '../QuantityInput'

class ShoppingCartItem extends Component{

    handleQuantityFieldChange(newValue){
        const {dispatchUpdateQuantity, id} = this.props
        dispatchUpdateQuantity(id, newValue)
    }

    render(){
        const {id, imagePath, title, price, quantity, dispatchRemoveItemFromCart} = this.props
        return(
            <tr>
                <td><img src={imagePath} height="80" height="80"/></td>
                <td><Link to={`/item/${id}`}>{title}</Link></td>
                <td>{price}</td>
                <td>
                    <QuantityInput 
                        onChange={this.handleQuantityFieldChange.bind(this)}
                        initialValue={quantity}
                    />
                </td>
                <td><Button onClick={() => dispatchRemoveItemFromCart(id)}>Remove</Button></td>
            </tr>
        )
    }
}

export default connect(
    null,
    (dispatch) => bindActionCreators({
        dispatchUpdateQuantity: updateQuantity,
        dispatchRemoveItemFromCart: removeFromCart
    },
    dispatch)
)(ShoppingCartItem)
