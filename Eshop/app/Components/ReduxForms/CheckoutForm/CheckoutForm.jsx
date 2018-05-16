import React from 'react'
import {connect} from 'react-redux'
import { bindActionCreators } from 'redux'
import { Field, reduxForm, formValueSelector } from 'redux-form'
import checkout from '../../../Redux/actions/CheckoutActions'

import validate from './checkOutValidation'
import renderTextField from '../ReduxFormFields/renderTextField'


class CheckoutForm extends React.Component{

    handleFormSubmission(data){
        data = {
            ...data,
            ammount: 100,
            number: data.number.replace(/ /g,''),
            exp_year: parseInt(data.exp_year),
            exp_month: parseInt(data.exp_month)
        }
        console.log(data)
    }

    render(){
        const { error, handleSubmit, submitting, dispatchCheckout} = this.props
        return (
          <div>
              <div id="id-checkout_ammount">Sum of items: {9999.69}</div>
              <form onSubmit={handleSubmit(this.handleFormSubmission)} className="form-checkout">
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
    
  }),
  (dispatch) => bindActionCreators({
      dispatchCheckout: checkout
  }
  ,dispatch)
)(CheckoutForm)

export default reduxForm({
  form: 'checkoutForm',
  validate
})(CheckoutForm)
