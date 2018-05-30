import React from 'react'
import {connect} from 'react-redux'
import { bindActionCreators } from 'redux'
import { Field, reduxForm, formValueSelector } from 'redux-form'

import validate from './validateFormFields'
import renderTextField from '../ReduxFormFields/renderTextField'
import { changePassword } from '../../../Redux/actions/EditUserInfoFormActions'
import '../ReduxFormStyles.css'


let ChangePasswordForm = props => {
  const { error, handleSubmit, submitting, dispatchChangePassword} = props
  return (
    <form onSubmit={handleSubmit(dispatchChangePassword)} className="form-changePassword">
        <Field
            name="currentPassword"
            type="password"
            component={renderTextField}
            label="Current password"
        />
        <Field
            name="newPassword"
            type="password"
            component={renderTextField}
            label="New password"
        />
        <Field
            name="newPassword2"
            type="password"
            component={renderTextField}
            label="Confirm new password"
        />

      {error && <strong>{error}</strong>}
      <div>
        <button type="submit" disabled={submitting}>
          Change password
        </button>
      </div>
    </form>
  )
}

ChangePasswordForm = connect(
  null,
  (dispatch) => bindActionCreators({
    dispatchChangePassword: changePassword
  }
  ,dispatch)
)(ChangePasswordForm)

export default reduxForm({
  form: 'changePasswordForm',
  validate
})(ChangePasswordForm)
