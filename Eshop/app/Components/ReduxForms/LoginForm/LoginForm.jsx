import React from 'react'
import {connect} from 'react-redux'
import { bindActionCreators } from 'redux'
import { Field, reduxForm } from 'redux-form'
import {Link} from 'react-router-dom'
import login from '../../../Redux/actions/LoginActions'

import validate from './validateFormFields'
import renderTextField from '../ReduxFormFields/renderTextField'


let LoginForm = props => {
  const { error, handleSubmit, submitting, dispatchLogin} = props
  return (
    <div>
      <form onSubmit={handleSubmit(dispatchLogin)} className="form-login">
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

        {error && <strong>{error}</strong>}
        <div>
          <button type="submit" disabled={submitting}>
            Login
          </button>
        </div>
      </form>
      <Link to="/register">Don't have an account? Register here</Link>
    </div>
  )
}

LoginForm = connect(
  (state) => ({
    error: state.LoginReducer.error
  }),
  (dispatch) => bindActionCreators({
    dispatchLogin: login
  }
  ,dispatch)
)(LoginForm)

export default reduxForm({
  form: 'loginForm',
  validate
})(LoginForm)
