import React from 'react'
import User from './User'
import {Table} from 'reactstrap'

class UserTable extends React.Component {
    constructor(props) {
        super(props)
    }
    render() {
        const userList = [{
            'username': 'gaidys',
            'email': 'asdasdd',
            'firstname': 'turbo',
            'lastname': 'equa',
            'isBlocked': true
        }]
        const users = userList.map(user => {
            return (
                <User 
                    key={user.username} 
                    email={user.email}
                    username={user.username}
                    firstname={user.firstname}
                    lastname={user.lastname}
                    isBlocked={user.isBlocked}
                />
            );
        });

        return (
            <Table responsive>
                <thead>
                <tr>
                    <th>Username</th>
                    <th>Email</th>
                    <th>First Name</th>
                    <th>Last Name</th>
                    <th>Block Status</th>
                </tr>
                </thead>
                <tbody>
                {users}
                </tbody>
            </Table>
        );
    }
}

export default UserTable