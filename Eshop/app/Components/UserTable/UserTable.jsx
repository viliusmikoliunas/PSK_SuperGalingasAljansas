import React from 'react'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import User from './User'
import {Table, Button} from 'reactstrap'
import loadUsers from '../../Redux/actions/UserListActions'
import changeBlockStatus from '../../Redux/actions/UserBlockActions'


class UserTable extends React.Component {
    constructor(props) {
        super(props)
    }

    componentDidMount() {
        this.props.dispatchLoadList()
    }

    handleUserBlock(userTableLine){
        this.setState({
            userList: {
                ...this.props.userList,
                [userTableLine]: {
                    isBlocked: true
                }
            }
        })
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
        dispatchBlock: changeBlockStatus
    }
    ,dispatch)
)(UserTable)
