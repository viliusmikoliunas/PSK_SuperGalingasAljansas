import React from 'react'
import {connect} from 'react-redux'
import { bindActionCreators } from 'redux'
import { Field, reduxForm, formValueSelector } from 'redux-form'

//import validate from './validations'
import renderTextField from '../ReduxFormFields/renderTextField'
import {updateUserInfo} from '../../../Redux/actions/EditUserInfoFormActions'


let EditUserInfoForm = (props) => {
	const { error, handleSubmit, submitting, pristine, dispatchUpdateUserInfo} = props
      return (
        <form onSubmit={handleSubmit((data) => dispatchUpdateUserInfo(data))} className="form-editUser">
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
                name="phoneNumber"
                type="tel"
                component={renderTextField}
                label="Telephone number"
            />
    
          {error && <strong>{error}</strong>}
          <div>
            <button type="submit" disabled={pristine || submitting}>
              Update Info
            </button>
          </div>
        </form>
      )
}

EditUserInfoForm =  reduxForm({
	form: 'editUserInfoForm',
	enableReinitialize: true,
	keepDirtyOnReinitialize : true,
	destroyOnUnmount: true
	//validate
})(EditUserInfoForm)

EditUserInfoForm = connect(
	(state) => ({
		error: state.RegisterReducer.error,
		initialValues: state.UserInfoFormReducer.userInfo
	}),
	dispatch => bindActionCreators({
		dispatchUpdateUserInfo: updateUserInfo
  	}
	,dispatch)
)(EditUserInfoForm)

export default EditUserInfoForm
