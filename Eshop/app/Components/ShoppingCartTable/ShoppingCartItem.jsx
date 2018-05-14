import React from 'react'
import {Button,InputGroup,InputGroupAddon,Input} from 'reactstrap'


const ShoppingCartItem = (props) => {
    const {id, imagePath, title, price, quantity, incrementQuantity, decrementQuantity} = props
    return(
        <tr>
            <td><img src={imagePath} height="100" height="100"/></td>
            <td>{title}</td>
            <td>{price}</td>
            <td>      
			<InputGroup>
				<InputGroupAddon addonType="prepend"><Button onClick={() => decrementQuantity(id)}>-</Button></InputGroupAddon>
				<Input value={quantity}></Input>
				<InputGroupAddon addonType="append"><Button onClick={() => incrementQuantity(id)}>+</Button></InputGroupAddon>
			</InputGroup>
            </td>
        </tr>
    )
}

export default ShoppingCartItem
