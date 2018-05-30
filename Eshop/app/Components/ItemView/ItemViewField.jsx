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
            value: '' || this.props.initialValue
        }
    }

    componentWillReceiveProps(newProps){
        if(JSON.stringify(this.props.initialValue) !== JSON.stringify(newProps.initialValue))
        {
            this.setState({
                value: newProps.initialValue
            })
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

    handleCostFieldChange(event){
        const match = /^[1-9][0-9]{0,3}(\.[0-9][0-9]?)?$/.exec(event.target.value)
        if (match === null) return
       
        if (match[0].length === event.target.value.length){
            this.setState({value: event.target.value})
        }
        
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
                                onKeyDown={event => {
                                    if (event.keyCode === 27){
                                        this.handleFieldValueChange()
                                    }
                                }}
                                onChange={event => this.setState({value: event.target.value})}
                            />
                        </div>
                    :   <div>
                            {icon} {this.props.pretext} {this.props.initialValue}
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
