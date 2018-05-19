import React from 'react'
import {Button} from 'reactstrap'


const User = (props) => {
    const { handleUserBlock, handleUserUnblock, username, email, firstname, lastname, isBlocked } = props

    const blockElement = isBlocked
      ? <Button color="success" onClick={() => handleUserUnblock(username)}>Unblock</Button>
      : <Button color="danger" onClick={() => handleUserBlock(username)}>Block</Button>

    return(
        <tr>
            <td>{username}</td>
            <td>{email}</td>
            <td>{firstname}</td>
            <td>{lastname}</td>
            <td>{blockElement}</td>
        </tr>
    )
}

export default User
