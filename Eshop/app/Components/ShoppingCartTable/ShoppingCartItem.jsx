import React from 'react'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import {Button,InputGroup,InputGroupAddon,Input} from 'reactstrap'


class User extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    const {imagePath, title, price, quantity} = this.props
    return(
        <tr>
            <td><img src={imagePath} height="100" height="100"/></td>
            <td>{title}</td>
            <td>{price}</td>
            <td>      
			<InputGroup>
				<InputGroupAddon addonType="prepend"><Button>-</Button></InputGroupAddon>
				<Input />
				<InputGroupAddon addonType="append"><Button>+</Button></InputGroupAddon>
			</InputGroup>
            </td>
        </tr>
    )
  }
}

export default connect(
	(state) => ({
		blockStatus: state.UserBlockStatusReducer.blockStatus
	}),
	(dispatch) => bindActionCreators({
    
  },
  dispatch)
)(User)
