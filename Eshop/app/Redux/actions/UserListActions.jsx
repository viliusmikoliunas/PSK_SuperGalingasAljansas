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
