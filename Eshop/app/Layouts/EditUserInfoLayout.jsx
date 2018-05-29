import React, { Component } from 'react'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'

import EditUserInfoForm from '../Components/ReduxForms/EditUserInfoForm/EditUserInfoForm'
import loadForm from '../Redux/actions/EditUserInfoFormActions'


class EditUserInfoLayout extends Component {

    componentDidMount(){
        this.props.dispatchLoadFormData()
    }
    
    render() {
        return (
            <div>
                <EditUserInfoForm/>
            </div>
        )
    }
}

export default connect(
    null,
    dispatch => bindActionCreators({
      dispatchLoadFormData: loadForm
    }
    ,dispatch)
)(EditUserInfoLayout)
