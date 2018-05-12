import generateRequestWithAuth from '../../FunctionalComponents/httpRequests/generateRequestWithAuth'
import UserListActionTypes from '../actionTypes/UserListActionTypes'


const address = '/api/users'

const loadUsers = () => (dispatch) => {
    const request = generateRequestWithAuth('GET', null)
    fetch(address,request)
        .then((response) => {
            if (response.ok){
                response.json()
                    .then((jsonResponse) => dispatch({
                        type: UserListActionTypes.LOAD_LIST,
                        userList: jsonResponse
                    }))
            }
        })
}

export default loadUsers
