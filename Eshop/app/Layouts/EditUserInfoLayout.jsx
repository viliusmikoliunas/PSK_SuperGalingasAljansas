import React, { Component } from 'react'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'

import EditUserInfoForm from '../Components/ReduxForms/EditUserInfoForm/EditUserInfoForm'
import loadForm from '../Redux/actions/EditUserInfoFormActions'


class EditUserInfoLayout extends Component {

    componentDidMount(){
        this.props.dispatchLoadForm()
    }

    render() {
        const {formData} = this.props
        return (
            <div>
                <EditUserInfoForm
                    initialValues={formData}
                />
                
            </div>
        )
    }
}

export default connect(
    (state) => ({
        formData: state.UserInfoFormReducer.userInfo
    }),
    (dispatch) => bindActionCreators({
        dispatchLoadForm: loadForm
    }
    ,dispatch)
)(EditUserInfoLayout)
