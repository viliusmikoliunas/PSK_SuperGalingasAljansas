import React from 'react'
import {Button} from 'reactstrap'


class User extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return(
        <tr>
            <td>{this.props.username}</td>
            <td>{this.props.email}</td>
            <td>{this.props.firstname}</td>
            <td>{this.props.lastname}</td>
            <td><Button>Block button</Button></td>
        </tr>
    )
  }
}


export default User;
