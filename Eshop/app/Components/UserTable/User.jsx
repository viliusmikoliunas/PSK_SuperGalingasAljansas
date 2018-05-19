import React from 'react'
import {Button} from 'reactstrap'


const User = (props) => {
    const { handleUserBlock, handleUserUnblock, username, email, firstname, lastname, isBlocked } = props

    const blockElement = isBlocked
      ? <Button onClick={() => handleUserUnblock(username)}>Unblock</Button>
      : <Button onClick={() => handleUserBlock(username)}>Block</Button>

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
