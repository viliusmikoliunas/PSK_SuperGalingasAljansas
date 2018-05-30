import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import {Redirect, Link} from 'react-router-dom'
import {Button, Modal, ModalHeader, ModalBody, ModalFooter, Input} from 'reactstrap'
import ReactStars from 'react-stars'
import history from '../Redux/history'


import CheckoutForm from '../Components/ReduxForms/CheckoutForm/CheckoutForm'
import loadCartFromDb from '../Redux/actions/ShoppingCartActions'

import {sendReview} from '../Redux/actions/CheckoutActions'

class CheckoutLayout extends Component {
    constructor(props) {
        super(props);
        this.state = {
            modal: false,
            rating: 0,
            description: ''
        };
        this.toggle = this.toggle.bind(this);
    }

    toggle() {
        this.setState({
        modal: !this.state.modal
        });
    }

    handleReviewSubmit() {
        this.props.dispatchSendReview(this.state.rating, this.state.description)
    }

    handleRatingChange(new_rating){
        this.setState({
            rating: new_rating
        })

    }

    handleDescriptionChange(new_description){
        this.setState({
            description: new_description
        })
    }

    render() {
        const {paymentSuccessful} = this.props
        const modalElement = 
            <div>
            <Button color="success" onClick={this.toggle}>Leave a review</Button>

            <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
                <ModalHeader toggle={this.toggle}>Your review</ModalHeader>
                <ModalBody>
                    <ReactStars
                        count={5}
                        half={false}
                        value={this.state.rating}
                        size={24}
                        color2={'#ffd700'}
                        onChange={(new_rating) => this.handleRatingChange(new_rating)}
                    />
                    Tell us what you think:<br/>
                    <Input 
                        type='text'
                        value={this.state.description}
                        onChange={(event) => this.handleDescriptionChange(event.target.value)}
                    />
                </ModalBody>
                <ModalFooter>
                    <Button color="success" disabled={this.state.rating === 0} onClick={() => this.handleReviewSubmit()} >Submit</Button>
                    <Button color="secondary" onClick={this.toggle}>Close</Button>
                </ModalFooter>
            </Modal>
        </div>
            
        const checkoutComponent = <CheckoutForm/>
        return (
            <div className='checkout-successful-element'>
                Checkout successful
                {modalElement}
                <Button color="info" onClick={() => history.push('/')}>Back to main page</Button>
            </div>
        )
    }
}

export default connect(
    (state) => ({
        paymentSuccessful: state.CheckOutReducer.paymentSuccessful
    }),
    (dispatch) => bindActionCreators({
        dispatchSendReview: sendReview
    }
    ,dispatch)
)(CheckoutLayout)
