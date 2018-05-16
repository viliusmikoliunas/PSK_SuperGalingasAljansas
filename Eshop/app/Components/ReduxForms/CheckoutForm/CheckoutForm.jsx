import React from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import { bindActionCreators } from 'redux'
import { Field, reduxForm, formValueSelector } from 'redux-form'
import checkout from '../../../Redux/actions/CheckoutActions'
import {loadShoppingCartFromLocalStorage} from '../../../Redux/actions/ShoppingCartActions'

import validate from './checkOutValidation'
import renderTextField from '../ReduxFormFields/renderTextField'


class CheckoutForm extends React.Component{

    componentDidMount(){
        this.props.dispatchLoadCartFromLocalStorage()
    }

    handleFormSubmission(data){
        let total = 0
        const {cartItemList, dispatchCheckout, error} = this.props
        cartItemList.map(cartItem => {
            total += cartItem.price*cartItem.quantity
            return
        })
        total *= 100 //euros to euro cents

        data = {
            ...data,
            ammount: total,
            number: data.number.replace(/ /g,''),
            exp_year: parseInt(data.exp_year),
            exp_month: parseInt(data.exp_month)
        }
        if (total > 999999){
            alert("Transaction ammount over limit (> 9999,99 euros), please remove something from your cart")
            return
        }
        dispatchCheckout(data)
    }

    render(){
        const { error, handleSubmit, submitting, dispatchCheckout} = this.props
        return (
          <div>
              <Link to={'/user/shopping-cart'}>Back to shopping cart</Link>
              <form onSubmit={handleSubmit(this.handleFormSubmission.bind(this))} className="form-checkout">
                  <Field
                      name="number"
                      type="string"
                      component={renderTextField}
                      label="Credit card number"
                  />
                  <Field
                      name="holder"
                      type="string"
                      component={renderTextField}
                      label="Card holder"
                  />
                  <Field
                      name="exp_year"
                      type="number"
                      component={renderTextField}
                      label="Expiry year"
                  />
                  <Field
                      name="exp_month"
                      type="number"
                      component={renderTextField}
                      label="Expiry month"
                  />
                  <Field
                      name="cvv"
                      type="string"
                      component={renderTextField}
                      label="CVV"
                  />
                  
              {error && <strong>{error}</strong>}
              <div>
                  <button type="submit" disabled={submitting}>
                      Pay
                  </button>
              </div>
              </form>
          </div>
        )
    }
}

CheckoutForm = connect(
  (state) => ({
    cartItemList: state.ShoppingCartReducer.shoppingCart
  }),
  (dispatch) => bindActionCreators({
      dispatchCheckout: checkout,
      //dispatchLoadCartFromDb: loadCartFromDb,
      dispatchLoadCartFromLocalStorage: loadShoppingCartFromLocalStorage
  }
  ,dispatch)
)(CheckoutForm)

export default reduxForm({
  form: 'checkoutForm',
  validate
})(CheckoutForm)
