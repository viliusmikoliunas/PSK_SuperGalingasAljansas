import React from 'react'
import {Link} from 'react-router-dom'
import history from '../../../Redux/history'
import QuantityInput from '../../QuantityInput/QuantityInput'
import toFixed from '../../../FunctionalComponents/formatting/toFixed'
import {Button} from 'reactstrap'
import './ItemRowStyles.css'
import {addNewItem, addSingleItemToShoppingCartInDb, formatShoppingCartItem} from '../../../Redux/actions/ShoppingCartActions'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'


import {getUserRoleFromToken} from '../../../FunctionalComponents/jwt/parseJwt'


class ItemRow extends React.Component {
    constructor(){
        super()
        this.state = {
            currentQuantity: 1
        }
    }

    handleAddToCart(){
        const {item, dispatchAddToCart, loggedIn, dispatchAddToDbCart} = this.props
        const {currentQuantity} = this.state
        if (loggedIn){
            dispatchAddToDbCart(item, currentQuantity, item.id)
        }
        else {
            dispatchAddToCart(item, currentQuantity)
            const shoppingc = JSON.parse(localStorage.getItem('shoppingCart'))
            if (shoppingc == null || shoppingc.length == 0){
                const newItem = formatShoppingCartItem(item, currentQuantity)
                localStorage.setItem('shoppingCart', JSON.stringify([newItem]))
            }
            else {
                const suspect = shoppingc.find(it => it.id === item.id)
                if (suspect == null) {
                    shoppingc.push(formatShoppingCartItem(item, currentQuantity))
                    localStorage.setItem('shoppingCart', JSON.stringify(shoppingc))
                }
                else {
                    const index = shoppingc.indexOf(suspect)
                    shoppingc.splice(index, 1)
                    suspect.quantity += currentQuantity
                    shoppingc.push(suspect)
                    localStorage.setItem('shoppingCart', JSON.stringify(shoppingc))
                }
            }
        }
        alert('item added to cart')
    }

    render(){
        const {id, title, cost, pictureLocation, itemCategories, itemTraits} = this.props.item
        let key = 0
        const categoryString = itemCategories.length > 0
            ? itemCategories.map(category => {
                return <p key={key++}>{category.title}</p>
            })
            : "<No categories>"
        
        const traitString = itemTraits.length > 0
            ? itemTraits.map(trait => {
                return <p key={key++}>{trait.title}</p>
            })
            : "<No properties>"

        const isAdmin = getUserRoleFromToken() === 'Admin'

        const quantityElement = isAdmin
        ? null
        : <td><QuantityInput 
            onChange={(value) => {
                this.setState({
                    currentQuantity: value
                })
            }}
        /></td>
        
        const addToCartButton = isAdmin
            ? null
            : <td><Button color='info' onClick={() => this.handleAddToCart()}>Add to cart</Button></td>

        return(
            <tr className="itemRow">
                <td scope="row">
                    <img 
                        src={pictureLocation}
                        onClick={() => history.push(/item/ + id )}
                    />
                </td>
                <td><Link to={/item/ + id }>{title}</Link></td>
                <td>{cost.toFixed(2)}</td>
                {quantityElement}
                {addToCartButton}
            </tr>
        )
    }
}
export default connect(
    (state) => ({
        loggedIn: state.LoginReducer.loggedIn,
        shoppingCart: state.ShoppingCartReducer.shoppingCart
    }),
    (dispatch) => bindActionCreators({
        dispatchAddToCart: addNewItem,
        dispatchAddToDbCart: addSingleItemToShoppingCartInDb
    }
    ,dispatch)
)(ItemRow)

/*
                <td>{categoryString}</td>
                <td>{traitString}</td>
*/