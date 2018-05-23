import React from 'react'
import {connect} from 'react-redux'
import { bindActionCreators } from 'redux'
import { Field, reduxForm, formValueSelector } from 'redux-form'

//import validate from './validations'
import renderTextField from '../ReduxFormFields/renderTextField'


let EditUserInfoForm = props => {
  const { error, handleSubmit, submitting} = props

  return (
    <form onSubmit={handleSubmit(() => (null))} className="form-editUser">
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
          Update Info
        </button>
      </div>
    </form>
  )
}

EditUserInfoForm = connect(
  (state) => ({
    error: state.RegisterReducer.error
  }),
  (dispatch) => bindActionCreators({
    
  }
  ,dispatch)
)(EditUserInfoForm)

export default reduxForm({
  form: 'editUserInfoForm'
  //validate
})(EditUserInfoForm)
