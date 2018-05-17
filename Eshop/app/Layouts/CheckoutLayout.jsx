import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import {Redirect, Link} from 'react-router-dom'

import CheckoutForm from '../Components/ReduxForms/CheckoutForm/CheckoutForm'
import {loadShoppingCartFromLocalStorage} from '../Redux/actions/ShoppingCartActions'


class CheckoutLayout extends Component {

    componentDidMount(){
        this.props.dispatchLoadCart()
    }

    render() {
        let checkoutComponent = <Redirect to={'/'}/>
        if (this.props.cart != null){
            if (this.props.cart.length > 0){
                checkoutComponent = <CheckoutForm/>
            }
        }

        return (
            <div>
                {checkoutComponent}
            </div>
        )
    }
}

export default connect(
    (state) => ({
        cart: state.ShoppingCartReducer.shoppingCart
    }),
    (dispatch) => bindActionCreators({
        dispatchLoadCart: loadShoppingCartFromLocalStorage
    }
    ,dispatch)
)(CheckoutLayout)
