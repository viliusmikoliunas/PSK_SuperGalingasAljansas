import React, {Component} from 'react'
import {Button,InputGroup,InputGroupAddon,Input} from 'reactstrap'
import './QuantityInputStyles.css'


class QuantityInput extends Component{
    constructor(props){
        super(props)
        this.state = {
            fieldValue: this.props.initialValue || 1,
            minValue: this.props.minValue || 1,
            maxValue: this.props.maxValue || 999999,
            onChange: this.props.onChange || ((temp) => (null))
        }
        this.handleQuantityFieldChange = this.handleQuantityFieldChange.bind(this)
    }

    incrementQuantityField(){
        const {fieldValue, maxValue, onChange} = this.state
        if (fieldValue < maxValue){
            const newValue = fieldValue + 1
            this.setState({
                fieldValue: newValue
            })   
            onChange(newValue)
        }
    }

    decrementQuantityField(){
        const {fieldValue, minValue, onChange} = this.state
        if (fieldValue > minValue){
            const newValue = fieldValue - 1
            this.setState({
                fieldValue: newValue
            })
            onChange(newValue)
        }
    }

    handleQuantityFieldChange(event){
        const {maxValue, onChange} = this.state
        const maxLength = maxValue.toString().length
        let newValue = event.target.value
        if (newValue.length > maxLength) return

        const match = /^[1-9][0-9]*/.exec(newValue)
        if(match === null) return

        if(newValue.length === match[0].length){
            newValue = parseInt(newValue)
            this.setState({
                fieldValue: newValue
            })
            onChange(newValue)
        }
    }

    render(){
        return(
            <InputGroup className="quanitityInputField">
                <InputGroupAddon addonType="prepend"><Button color="danger" onClick={() => this.decrementQuantityField()}>-</Button></InputGroupAddon>
                <Input value={this.state.fieldValue} onChange={this.handleQuantityFieldChange}/>
                <InputGroupAddon addonType="append"><Button color="success" onClick={() => this.incrementQuantityField()}>+</Button></InputGroupAddon>
            </InputGroup>
        )
    }
}

export default QuantityInput
