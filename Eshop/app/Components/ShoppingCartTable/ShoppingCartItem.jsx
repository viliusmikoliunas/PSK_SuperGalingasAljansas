import React, {Component} from 'react'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import {Button,InputGroup,InputGroupAddon,Input} from 'reactstrap'
import {incrementQuantity, decrementQuantity, updateQuantity, removeFromCart} from '../../Redux/actions/ShoppingCartActions'


class ShoppingCartItem extends Component{
    constructor(props){
        super(props)
        this.state = {
            quantityFieldValue: this.props.quantity || 1
        }
        this.handleQuantityFieldChange = this.handleQuantityFieldChange.bind(this)
    }

    incrementQuantityField(){
        const {id, dispatchIncrementQuantity, quantity} = this.props
        if (quantity < 1000000){
            dispatchIncrementQuantity(id)
            this.setState({
                quantityFieldValue: this.state.quantityFieldValue + 1
            })   
        }
    }

    decrementQuantityField(){
        const {id, dispatchDecrementQuantity, quantity} = this.props
        if (quantity > 1){
            dispatchDecrementQuantity(id)
            this.setState({
                quantityFieldValue: this.state.quantityFieldValue - 1
            })
        }
    }

    handleQuantityFieldChange(event){
        const {dispatchUpdateQuantity, id} = this.props
        const newValue = event.target.value
        if (newValue.length >= 7) return

        const match = /^[1-9][0-9]*/.exec(newValue)
        if(match === null) return

        if(newValue.length === match[0].length){
            this.setState({
                quantityFieldValue: newValue
            })
            dispatchUpdateQuantity(id, newValue)
        }
    }

    render(){
        const {id, imagePath, title, price, quantity, dispatchRemoveItemFromCart} = this.props
        return(
            <tr>
                <td><img src={imagePath} height="80" height="80"/></td>
                <td>{title}</td>
                <td>{price}</td>
                <td>
                    <InputGroup>
                        <InputGroupAddon addonType="prepend"><Button onClick={() => this.decrementQuantityField()}>-</Button></InputGroupAddon>
                        <Input value={this.state.quantityFieldValue} onChange={this.handleQuantityFieldChange}/>
                        <InputGroupAddon addonType="append"><Button onClick={() => this.incrementQuantityField()}>+</Button></InputGroupAddon>
                    </InputGroup>
                </td>
                <td><Button onClick={() => dispatchRemoveItemFromCart(id)}>Remove</Button></td>
            </tr>
        )
    }
}

export default connect(
    null,
    (dispatch) => bindActionCreators({
        dispatchIncrementQuantity: incrementQuantity,
        dispatchDecrementQuantity: decrementQuantity,
        dispatchUpdateQuantity: updateQuantity,
        dispatchRemoveItemFromCart: removeFromCart
    },
    dispatch)
)(ShoppingCartItem)
