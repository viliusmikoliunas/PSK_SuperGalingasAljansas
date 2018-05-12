import React from 'react'
import {Button} from 'reactstrap'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'

import changeBlockStatus from '../../Redux/actions/UserBlockActions'


class User extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    const {blockStatus, dispatchBlock} = this.props
    const blockElement = this.props.isBlocked || blockStatus
      ? 'This user is blocked'
      : <Button onClick={() => {dispatchBlock(this.props.username)}}>Block</Button>
    return(
        <tr>
            <td>{this.props.username}</td>
            <td>{this.props.email}</td>
            <td>{this.props.firstname}</td>
            <td>{this.props.lastname}</td>
            <td>{blockElement}</td>
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
