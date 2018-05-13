import React from 'react'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import {Button} from 'reactstrap'
import changeBlockStatus from '../../Redux/actions/UserBlockActions'


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
            <td>{quantity}</td>
            <td>{price*quantity}</td>
        </tr>
    )
  }
}

export default connect(
	(state) => ({
		blockStatus: state.UserBlockStatusReducer.blockStatus
	}),
	(dispatch) => bindActionCreators({
    dispatchBlock: changeBlockStatus
  },
  dispatch)
)(User)
