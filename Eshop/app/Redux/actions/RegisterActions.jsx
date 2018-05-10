import LoginActionTypes from '../actionTypes/RegisterActionTypes'
import generateRequest from '../../FunctionalComponents/httpRequests/generateRequest'
import history from '../../Redux/history'


const registerAddress = '/api/account/register'

const register = (loginValues) => (dispatch) => {
    fetch(registerAddress,generateRequest('POST',loginValues))
        .then(response => {
            if (response.ok){
                response.text().then(
                    (jwtToken) => {
                        localStorage.setItem('jwtToken', jwtToken)
                    }
                )
                dispatch({
                    type: LoginActionTypes.REGISTER_SUCCESS
                })
                history.push('/')
            }
            else {
                response.text().then(
                    (responsetext) => dispatch({
                        type: LoginActionTypes.REGISTER_FAILURE,
                        error: responsetext
                    })
                )
                
            }
        })
        .catch((err) => {
            dispatch({
                type: LoginActionTypes.REGISTER_FAILURE,
                error: String(err)
            })
        })
}

export default register