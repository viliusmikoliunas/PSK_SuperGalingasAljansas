import LoginActionTypes from '../actionTypes/LoginActionTypes'
import history from '../../Redux/history'


const registerAddress = '/api/account/login'

const requestParams = (bodyVal) => {
    return({
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(bodyVal)
    })
}

const login = (loginValues) => (dispatch) => {
    dispatch({
        type: LoginActionTypes.LOGIN_REQUEST
    })
    fetch(registerAddress,requestParams(loginValues))
        .then(response => {
            console.log(response)
            if (response.ok){
                dispatch({
                    type: LoginActionTypes.LOGIN_SUCCESS
                })
                response.text().then(
                    (jwtToken) => {
                        localStorage.setItem('jwtToken', jwtToken)
                    }
                )
                history.push('/')
            }
            else {
                dispatch({
                    type: LoginActionTypes.LOGIN_FAILURE,
                    error: "Username and password don't match"
                })
            }
        })
        .catch((err) => {
            dispatch({
                type: LoginActionTypes.LOGIN_FAILURE,
                error: String(err)
            })
        })
}

export default login
