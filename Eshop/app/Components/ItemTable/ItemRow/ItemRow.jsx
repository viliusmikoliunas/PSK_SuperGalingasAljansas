import React from 'react'
import {Link} from 'react-router-dom'
import history from '../../../Redux/history'
import QuantityInput from '../../QuantityInput/QuantityInput'
import toFixed from '../../../FunctionalComponents/formatting/toFixed'
import {Button} from 'reactstrap'
import './ItemRowStyles.css'
import {addNewItem, addSingleItemToShoppingCartInDb} from '../../../Redux/actions/ShoppingCartActions'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'



class ItemRow extends React.Component {
    constructor(){
        super()
        this.state = {
            currentQuantity: 1
        }
    }

    handleAddToCart(){
        const {item, dispatchAddToCart, loggedIn, dispatchAddToDbCart} = this.props
        if (loggedIn){
            dispatchAddToDbCart(item, this.state.currentQuantity, item.id)
            alert('item added to cart')
        }
        else {
            dispatchAddToCart(item, this.state.currentQuantity)
            const shoppingc = JSON.parse(localStorage.getItem('shoppingCart'))
            if (shoppingc == null || shoppingc.length == 0){
                localStorage.setItem('shoppingCart', JSON.stringify([{
                    ...item,
                    quantity: this.state.currentQuantity
                }]))
            }
            else {
                const newList = shoppingc.map(i => {
                    if (i.id === item.id){
                        i.quantity += this.state.currentQuantity
                        return i
                    }
                    else return item
                })
                localStorage.setItem('shoppingCart', JSON.stringify(newList))
            }

        }
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
                <td><QuantityInput 
                        onChange={(value) => {
                            this.setState({
                                currentQuantity: value
                            })
                        }}
                    />
                </td>
                <td><Button color='info' onClick={() => this.handleAddToCart()}>Add to cart</Button></td>
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