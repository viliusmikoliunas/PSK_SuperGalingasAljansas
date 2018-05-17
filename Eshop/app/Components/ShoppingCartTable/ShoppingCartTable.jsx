import React from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {bindActionCreators} from 'redux'
import {Table, Button} from 'reactstrap'
import ShoppingCartItem from './ShoppingCartItem'
import toFixed from '../../FunctionalComponents/formatting/toFixed'
import loadCartFromDb, {loadShoppingCartFromLocalStorage, clearCart} from '../../Redux/actions/ShoppingCartActions'


class ShoppingCartTable extends React.Component {
    constructor(){
        super()
        this.onLeave = this.onLeave.bind(this)
    }

    onLeave(){
        const {loggedIn} = this.props
        //if (loggedIn){
            //send cart to DB
        //}
        //else {
            localStorage.setItem('shoppingCart', JSON.stringify(this.props.cartItemList))
        //}
    }

    componentDidMount(){
        window.addEventListener('beforeunload', this.onLeave)
        const {loggedIn, dispatchLoadCartFromDb, dispatchLoadCartFromLocalStorage} = this.props
        //if (loggedIn){
        //    dispatchLoadCartFromDb()
        //}
        //else {
            dispatchLoadCartFromLocalStorage()
        //}
    }

    componentWillUnmount(){
        this.onLeave()
        window.removeEventListener('beforeunload', this.onLeave)
    }

    //max price 999999 cents == 9999,99 euros. Need constraint
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

        const linkToCheckout = this.props.cartItemList.length > 0 && total < 10000
            ? <Link to={'/checkout'}>Proceed to checkout</Link>
            : <div>Proceed to checkout</div>
        
        const errorMsg = total >= 10000
            ? <div className="ammountErrorMessage">
                Price exceeds the limit of 9999.99 €<br/>
                Please remove some items from the cart
            </div>
            : null
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
                        <td>{toFixed(total,2)} {errorMsg}</td>
                        <td/>
                        <td><Button onClick={() => dispatchClearCart()}>Clear Cart</Button></td>
                    </tr>
                    <tr>
                        <td colSpan="5">
                            {linkToCheckout}
                        </td>
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
