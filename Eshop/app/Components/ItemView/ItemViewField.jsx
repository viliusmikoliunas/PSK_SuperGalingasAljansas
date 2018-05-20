import React, {Component} from 'react'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import FaEdit from 'react-icons/lib/fa/edit'
import {updateItemField} from '../../Redux/actions/ItemViewActions'


class ItemViewField extends Component{
    constructor(props){
        super(props)
        this.state = {
            inEditMode: false,
            value: ''
        }
    }

    toggleEditMode(){
        if (this.state.inEditMode){
            this.handleFieldValueChange()
        }

        this.setState({
            inEditMode: !this.state.inEditMode
        })
    }

    handleFieldValueChange(){
        this.setState({
            inEditMode: false
        })
        this.props.dispatchUpdateItemField(this.props.fieldTitle, this.state.value)
        this.props.callback(this.props.fieldTitle, this.state.value)
    }

    render() {
        const icon = 
            <FaEdit
                onClick={this.toggleEditMode.bind(this)}
            />
        return (
            <td>
                {
                this.state.inEditMode 
                    ?   <div>
                            {icon} <input 
                                defaultValue={this.props.initialValue}
                                onKeyPress={event => {
                                    if (event.key === 'Enter'){
                                        this.handleFieldValueChange()
                                    }
                                }}
                                onChange={(event) => this.setState({value: event.target.value})}
                            />
                        </div>
                    :   <div>
                            {icon}  {this.props.initialValue}
                        </div>
                }
            </td>
        )
    }
}

export default connect(
    (state) => ({
        item: state.ItemViewReducer.item
    }),
    (dispatch) => bindActionCreators({
        dispatchUpdateItemField: updateItemField
    }
    ,dispatch)
)(ItemViewField)
