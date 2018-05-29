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

    toggle() {
        this.setState({
        modal: !this.state.modal
        });
    }


    render() {
        const {paymentSuccessful} = this.props

        console.log(paymentSuccessful)

        const modalElement = 
            <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
                <ModalHeader toggle={this.toggle}>Your review</ModalHeader>
                <ModalBody>
                    <ReactStars
                        count={5}
                        //value={5}
                        edit={false}
                        size={24}
                        color2={'#ffd700'} 
                    /><br/>
                    Aprasas
                </ModalBody>
                <ModalFooter>
                    <Button color="secondary" onClick={this.toggle}>Close</Button>
                </ModalFooter>
            </Modal>
            
        const checkoutComponent = <CheckoutForm/>
        return (
            <div>
                {checkoutComponent}
                {modalElement}
            </div>
        )
    }
}

export default connect(
    (state) => ({
        paymentSuccessful: state.CheckOutReducer.paymentSuccessful
    }),
    (dispatch) => bindActionCreators({
        //dispatchLoadCart: loadCartFromDb
    }
    ,dispatch)
)(CheckoutLayout)
