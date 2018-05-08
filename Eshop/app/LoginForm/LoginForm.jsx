import React from 'react'
import {connect} from 'react-redux'
import { Field, reduxForm, formValueSelector } from 'redux-form'

import login from './submitLoginForm'
import validate from './validateFormFields'
import {renderField, renderSelectField} from './FieldRenderingMethods'


const LoginForm = props => {
  const { error, handleSubmit, pristine, reset, submitting } = props
  return (
    <form onSubmit={handleSubmit(login)} className="form-registerUser">
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

export default reduxForm({
  form: 'loginForm',
  validate
})(LoginForm)
