import React from 'react'
import {connect} from 'react-redux'
import { bindActionCreators } from 'redux'
import { Field, reduxForm, formValueSelector } from 'redux-form'
import register from '../../../Redux/actions/RegisterActions'

import validate from './validateFormFields'
import renderTextField from '../ReduxFormFields/renderTextField'
import '../ReduxFormStyles.css'

let RegisterForm = props => {
  const { error, handleSubmit, submitting, dispatchRegister} = props
  return (
    <form onSubmit={handleSubmit(dispatchRegister)} className="form-redux">
        <Field
            name="username"
            type="string"
            component={renderTextField}
            label="Username*"
        />
        <Field
            name="password"
            type="password"
            component={renderTextField}
            label="Password*"
        />
        <Field
            name="password2"
            type="password"
            component={renderTextField}
            label="Confirm password*"
        />
        <Field
            name="email"
            type="email"
            component={renderTextField}
            label="Email*"
        />
        <Field
            name="firstname"
            type="string"
            component={renderTextField}
            label="First name"
        />
        <Field
            name="lastname"
            type="string"
            component={renderTextField}
            label="Last name"
        />
        <Field
            name="phoneNumber"
            type="tel"
            component={renderTextField}
            label="Telephone number"
        />

      {error && <strong>{error}</strong>}
      <div>
        <button type="submit" disabled={submitting}>
          Register
        </button>
      </div>
    </form>
  )
}

RegisterForm = connect(
  (state) => ({
    error: state.RegisterReducer.error
  }),
  (dispatch) => bindActionCreators({
    dispatchRegister: register
  }
  ,dispatch)
)(RegisterForm)

export default reduxForm({
  form: 'registerForm',
  validate
})(RegisterForm)
