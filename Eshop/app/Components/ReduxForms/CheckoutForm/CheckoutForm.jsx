import React from 'react'
import {connect} from 'react-redux'
import { bindActionCreators } from 'redux'
import { Field, reduxForm, formValueSelector } from 'redux-form'
//import register from '../../../Redux/actions/RegisterActions'

import validate from './checkOutValidation'
import renderTextField from '../ReduxFormFields/renderTextField'


let CheckoutForm = props => {
  const { error, handleSubmit, submitting} = props
/*
{
  "amount": 100, shopping cart total
  "number": "4111111111111111", input
  "holder": "Vardenis Pavardenis", input/pre-load
  "exp_year": 2018, //input
  "exp_month": 9, // input
  "cvv": "123" // input
}
*/
  return (
    <div>
        <div id="id-checkout_ammount">Sum of items: {9999.69}</div>
        <form onSubmit={handleSubmit(() => null)} className="form-checkout">
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

CheckoutForm = connect(
  (state) => ({
    
  }),
  null
)(CheckoutForm)

export default reduxForm({
  form: 'checkoutForm',
  validate
})(CheckoutForm)

