import React from 'react'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import {Table, Button} from 'reactstrap'
import ShoppingCartItem from './ShoppingCartItem'
import toFixed from '../../FunctionalComponents/formatting/toFixed'
import loadCartFromDb, {loadShoppingCartFromLocalStorage, clearCart} from '../../Redux/actions/ShoppingCartActions'


class ShoppingCartTable extends React.Component {
    constructor(){
        super()
        this.onLeavingCart = this.onLeavingCart.bind(this)
    }

    onLeavingCart(){
        const {loggedIn} = this.props
        //if (loggedIn){
            //send cart to DB
        //}
        //else {
            localStorage.setItem('shoppingCart', JSON.stringify(this.props.cartItemList))
        //}
    }

    componentDidMount(){
        window.addEventListener('beforeunload', this.onLeavingCart)
        const {loggedIn, dispatchLoadCartFromDb, dispatchLoadCartFromLocalStorage} = this.props
        //if (loggedIn){
        //    dispatchLoadCartFromDb()
        //}
        //else {
            dispatchLoadCartFromLocalStorage()
        //}
    }

    componentWillUnmount(){
        this.onLeavingCart()
        window.removeEventListener('beforeunload', this.onLeavingCart)
    }

    render() {
        const {cartItemList, dispatchClearCart} = this.props
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
                        <th>Unit Price(€)</th>
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
                        <td>Total Price</td>
                        <td>{toFixed(total,2)}</td>
                        <td/>
                        <td><Button onClick={() => dispatchClearCart()}>Clear Cart</Button></td>
                    </tr>
                    <tr>
                        <td colSpan="5"><Button>Proceed to checkout</Button></td>
                    </tr>
                </tbody>
            </Table>
        )
    }
}

export default connect(
    (state) => ({
        cartItemList: state.ShoppingCartReducer.shoppingCart,
        loggedIn: state.LoginReducer.loggedIn
    }),
    (dispatch) => bindActionCreators({
        dispatchLoadCartFromDb: loadCartFromDb,
        dispatchLoadCartFromLocalStorage: loadShoppingCartFromLocalStorage,
        dispatchClearCart: clearCart
    },
    dispatch)
)(ShoppingCartTable)
