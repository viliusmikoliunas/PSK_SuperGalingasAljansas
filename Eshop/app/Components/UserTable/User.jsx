import React from 'react'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import {Button} from 'reactstrap'
import changeBlockStatus from '../../Redux/actions/UserBlockActions'


class User extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      isBlocked: this.props.isBlocked
    }
  }

  handleBlock(userLine){
    const {dispatchBlock, username, blockStatus, handleUserBlock} = this.props
    dispatchBlock(username)
    if (blockStatus){
      this.setState({
        isBlocked: true
      })
      handleUserBlock(userLine)
    }
  }

  render() {
    const { blockStatus, dispatchBlock, handleUserBlock } = this.props
    const blockElement = this.state.isBlocked
      ? 'This user is blocked'
      : <Button onClick={() => this.handleBlock(this)}>Block</Button>

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
