import LoginActionTypes from '../actionTypes/LoginActionTypes'
import RegisterActionTypes from '../actionTypes/RegisterActionTypes'
import {generatePOSTrequest} from '../../FunctionalComponents/httpRequests/generateRequest'
import history from '../../Redux/history'


const registerAddress = '/api/account/register'

const register = (loginValues) => (dispatch) => {
    fetch(registerAddress,generatePOSTrequest(loginValues))
        .then(response => {
            if (response.ok){
                response.text().then(
                    (jwtToken) => {
                        localStorage.setItem('jwtToken', jwtToken)
                        dispatch({
                            type: RegisterActionTypes.REGISTER_SUCCESS
                        })
                        dispatch({
                            type: LoginActionTypes.LOGIN_SUCCESS
                        })
                    }
                )
                history.push('/')
            }
            else {
                response.text().then(
                    (responsetext) => dispatch({
                        type: RegisterActionTypes.REGISTER_FAILURE,
                        error: responsetext
                    })
                )
                
            }
        })
        .catch((err) => {
            dispatch({
                type: RegisterActionTypes.REGISTER_FAILURE,
                error: String(err)
            })
        })
}

export default register