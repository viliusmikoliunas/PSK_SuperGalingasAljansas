import React from 'react'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import User from './User'
import {Table} from 'reactstrap'
import loadUsers, {blockUser, unblockUser} from '../../Redux/actions/UserListActions'


class UserTable extends React.Component {

    componentDidMount() {
        this.props.dispatchLoadList()
    }

    handleUserBlock(userCardUsername){
        this.props.dispatchBlockUser(userCardUsername)
    }

    handleUserUnblock(userCardUsername){
        this.props.dispatchUnblockUser(userCardUsername)
    }

    render() {
        const {userList} = this.props
        const users = userList.map(user => {
            return (
                <User 
                    key={user.username} 
                    email={user.email}
                    username={user.username}
                    firstname={user.firstname}
                    lastname={user.lastname}
                    isBlocked={user.isBlocked}
                    handleUserBlock={this.handleUserBlock.bind(this)}
                    handleUserUnblock={this.handleUserUnblock.bind(this)}
                />
            )
        })
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
        )
    }
}
export default connect(
    (state) => ({
        userList: state.UserListReducer.userList
    }),
    (dispatch) => bindActionCreators({
        dispatchLoadList: loadUsers,
        dispatchBlockUser: blockUser,
        dispatchUnblockUser: unblockUser
    }
    ,dispatch)
)(UserTable)
