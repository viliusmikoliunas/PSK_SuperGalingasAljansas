import generateRequestWithAuth from '../../FunctionalComponents/httpRequests/generateRequestWithAuth'
import UserListActionTypes from '../actionTypes/UserListActionTypes'


const loadUsersAddress = '/api/users'

const loadUsers = () => (dispatch) => {
    const request = generateRequestWithAuth('GET', null)
    fetch(loadUsersAddress,request)
        .then((response) => {
            if (response.ok){
                response.json()
                    .then((jsonResponse) => dispatch({
                        type: UserListActionTypes.LOAD_LIST,
                        userList: jsonResponse
                    }))
            }
            else console.log(response.status + " " + response.statusText)
        })
}

export default loadUsers

const blockUserAddress = '/api/users/block'

const blockUserBody = (username, toBlock) => ({
    'Username': username,
    'Block': toBlock
})

export const blockUser = (username) => (dispatch) => {
    changeBlockStatus(username, true, UserListActionTypes.BLOCK_USER)(dispatch)
}

export const unblockUser = (username) => (dispatch) => {
    changeBlockStatus(username, false, UserListActionTypes.UNBLOCK_USER)(dispatch)
}

const changeBlockStatus = (username, toBlock, actionType) => (dispatch) => {
    const request = generateRequestWithAuth('PUT', blockUserBody(username, toBlock))
    fetch(blockUserAddress, request)
        .then((response) => {
            if (response.ok){
                response.text().then((responseMsg) => alert(responseMsg))
                dispatch({
                    type: actionType,
                    username: username
                })
            }
            else alert(response.status + " " + response.statusText)
        })
}
