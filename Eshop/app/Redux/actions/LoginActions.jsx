import LoginActionTypes from '../actionTypes/LoginActionTypes'
import ShoppingCartActionTypes from '../actionTypes/ShoppingCartActionTypes'
import generateRequest from '../../FunctionalComponents/httpRequests/generateRequest'
import history from '../../Redux/history'


const loginAddress = '/api/account/login'

const login = (loginValues) => (dispatch) => {
    dispatch({
        type: LoginActionTypes.LOGIN_REQUEST
    })
    fetch(loginAddress,generateRequest('POST',loginValues))
        .then(response => {
            if (response.ok){
                response.text().then(
                    (jwtToken) => {
                        localStorage.setItem('jwtToken', jwtToken)
                        dispatch({
                            type: LoginActionTypes.LOGIN_SUCCESS
                        })
                    }
                )
                history.push('/')
            }
            else {
                response.json().then(
                    responseMessage => 
                        dispatch({
                            type: LoginActionTypes.LOGIN_FAILURE,
                            error: responseMessage.message
                        })
                )
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

export const logout = () => (dispatch) => {
    localStorage.removeItem('jwtToken')
    localStorage.removeItem('shoppingCart')
    dispatch({
        type: LoginActionTypes.LOGOUT
    })
    dispatch({
        type: ShoppingCartActionTypes.CLEAR_ALL_ITEMS
    })
    history.push('/')
    alert("You have logged out")
}
