import React from 'react'
import {connect} from 'react-redux'
import { bindActionCreators } from 'redux'
import { Field, reduxForm, formValueSelector } from 'redux-form'
import login from '../../Redux/actions/LoginActions'

//import validate from './validateFormFields'
import renderTextField from '../ReduxFormFields/renderTextField'


let RegisterForm = props => {
  const { error, handleSubmit, pristine, reset, submitting, dispatchLogin} = props
  return (
    <form onSubmit={handleSubmit(dispatchLogin)} className="form-registerUser">
        <Field
            name="username"
            type="string"
            component={renderTextField}
            label="Username"
        />
        <Field
            name="password"
            type="password"
            component={renderTextField}
            label="Password"
        />
        <Field
            name="password2"
            type="password"
            component={renderTextField}
            label="Confirm password"
        />
        <Field
            name="email"
            type="email"
            component={renderTextField}
            label="Email"
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
            name="phone"
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
    error: state.LoginReducer.error
  }),
  (dispatch) => bindActionCreators({
    dispatchLogin: login
  }
  ,dispatch)
)(RegisterForm)

export default reduxForm({
  form: 'registerForm'//,
  //validate
})(RegisterForm)
