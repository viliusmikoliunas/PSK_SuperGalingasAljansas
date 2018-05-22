import React from 'react'
import {connect} from 'react-redux'
import { bindActionCreators } from 'redux'
import { Field, reduxForm, formValueSelector } from 'redux-form'
import {Button} from 'reactstrap'
import validate from './validateFormFields'
import renderTextField from '../ReduxFormFields/renderTextField'
import ItemView from '../../ItemView/ItemView';


let CreateItemForm = props => {
  const { error, handleSubmit, submitting} = props
  return (
    <form onSubmit={handleSubmit((data) => console.log(data))} className="form-registerUser">
        <Field
            name="title"
            type="string"
            component={renderTextField}
            label="Item title*"
        />
        <Field
            name="cost"
            type="string"
            component={renderTextField}
            label="Item cost*"
        />
        <Field
            name="description"
            type="string"
            component={renderTextField}
            label="Item description"
        />
        <Field
            name="pictureLocation"
            type="string"
            component={renderTextField}
            label="Item picture link"
        />

    {error && <strong>{error}</strong>}
    <div>
        <Button color="success" type="submit" disabled={submitting}>
            Create Item
        </Button>
    </div>
    </form>
  )
}

CreateItemForm = connect(
  (state) => ({
    //error: state.RegisterReducer.error
  }),
  (dispatch) => bindActionCreators({
    
  }
  ,dispatch)
)(CreateItemForm)

export default reduxForm({
  form: 'createItemForm',
  validate
})(CreateItemForm)
