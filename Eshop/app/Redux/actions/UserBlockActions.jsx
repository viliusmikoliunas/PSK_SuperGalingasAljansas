import generateRequestWithAuth from '../../FunctionalComponents/httpRequests/generateRequestWithAuth'
import UserBlockActionTypes from '../actionTypes/UserBlockActionTypes'


const blockUserAddress = '/api/users/block'

const blockUserBody = (username) => ({
    'Username': username,
    'Block': true
})

const changeBlockStatus = (username) => (dispatch) => {
    const request = generateRequestWithAuth('PUT', blockUserBody(username))
    fetch(blockUserAddress, request)
        .then((response) => {
            if (response.ok){
                response.text().then((responseMsg) => alert(responseMsg))
                dispatch({
                    type: UserBlockActionTypes.BLOCK
                })
            }
            else alert(response.status + " " + response.statusText)
        })
}

export default changeBlockStatus
