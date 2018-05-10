import React from 'react'
import {connect} from 'react-redux'
import { bindActionCreators } from 'redux'
import { Field, reduxForm, formValueSelector } from 'redux-form'
import login from '../../Redux/actions/LoginActions'

import validate from './validateFormFields'
import {renderField, renderSelectField} from './FieldRenderingMethods'


let LoginForm = props => {
  const { error, handleSubmit, pristine, reset, submitting, dispatchLogin} = props
  return (
    <form onSubmit={handleSubmit(dispatchLogin)} className="form-registerUser">
        <Field
            name="username"
            type="string"
            component={renderField}
            label="Username"
        />
        <Field
            name="password"
            type="password"
            component={renderField}
            label="Password"
        />

      {error && <strong>{error}</strong>}
      <div>
        <button type="submit" disabled={submitting}>
          Login
        </button>
      </div>
    </form>
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
