import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import {Redirect, Link} from 'react-router-dom'
import {Button, Modal, ModalHeader, ModalBody, ModalFooter} from 'reactstrap'
import ReactStars from 'react-stars'

import CheckoutForm from '../Components/ReduxForms/CheckoutForm/CheckoutForm'
import loadCartFromDb from '../Redux/actions/ShoppingCartActions'

class CheckoutLayout extends Component {
    constructor(props) {
        super(props);
        this.state = {
          modal: false
        };
    
        this.toggle = this.toggle.bind(this);
    }

    componentDidMount(){
        const {dispatchLoadCartFromDb} = this.props
        dispatchLoadCartFromDb()
    }

    toggle() {
        this.setState({
        modal: !this.state.modal
        });
    }


    render() {
        const {paymentSuccessful, shoppingCart} = this.props
        let amount = 0
        shoppingCart.map(item => {
            return (
                amount += item.price*item.quantity
            )
        })
        const checkoutComponent = 
            <CheckoutForm
                amount = {amount}
            />
        


        return (
            <div>
                {checkoutComponent}
            </div>
        )
    }
}

export default connect(
    (state) => ({
        paymentSuccessful: state.CheckOutReducer.paymentSuccessful,
        shoppingCart: state.ShoppingCartReducer.shoppingCart
    }),
    (dispatch) => bindActionCreators({
        dispatchLoadCartFromDb: loadCartFromDb
    }
    ,dispatch)
)(CheckoutLayout)
