import React, {Component} from 'react'
import {Button,InputGroup,InputGroupAddon,Input} from 'reactstrap'


class QuantityInput extends Component{
    constructor(props){
        super(props)
        this.state = {
            fieldValue: this.props.initialValue || 1,
            minValue: this.props.minValue || 1,
            maxValue: this.props.maxValue || 999999
        }
        this.handleQuantityFieldChange = this.handleQuantityFieldChange.bind(this)
    }

    incrementQuantityField(){
        const {fieldValue} = this.state
        if (fieldValue < this.state.maxValue){
            const newValue = this.state.fieldValue + 1
            this.setState({
                fieldValue: newValue
            })   
            this.props.onChange(newValue)
        }
    }

    decrementQuantityField(){
        const {fieldValue} = this.state
        if (fieldValue > this.state.minValue){
            const newValue = this.state.fieldValue - 1
            this.setState({
                fieldValue: newValue
            })
            this.props.onChange(newValue)
        }
    }

    handleQuantityFieldChange(event){
        const maxLength = this.state.maxValue.toString().length
        const newValue = event.target.value
        if (newValue.length > maxLength) return

        const match = /^[1-9][0-9]*/.exec(newValue)
        if(match === null) return

        if(newValue.length === match[0].length){
            this.setState({
                fieldValue: parseInt(newValue)
            })
            this.props.onChange(newValue)
        }
    }

    render(){
        return(
            <InputGroup className="quanitityInputField">
                <InputGroupAddon addonType="prepend"><Button onClick={() => this.decrementQuantityField()}>-</Button></InputGroupAddon>
                <Input value={this.state.fieldValue} onChange={this.handleQuantityFieldChange}/>
                <InputGroupAddon addonType="append"><Button onClick={() => this.incrementQuantityField()}>+</Button></InputGroupAddon>
            </InputGroup>
        )
    }
}

export default QuantityInput
