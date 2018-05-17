import React from 'react'
import {Button} from 'reactstrap'


const User = (props) => {
    const { handleUserBlock, username, email, firstname, lastname, isBlocked } = props

    const blockElement = isBlocked
      ? 'This user is blocked'
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
