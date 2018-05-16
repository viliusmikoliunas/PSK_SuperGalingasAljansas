import generateRequestWithAuth from '../../FunctionalComponents/httpRequests/generateRequestWithAuth'
import history from '../../Redux/history'
import ShoppingCartActionTypes from '../actionTypes/ShoppingCartActionTypes'


const serverOrderAddress = '/api/orders'

const checkout = (checkoutData) => (dispatch) => {
    const apiServerRequest = generateRequestWithAuth('POST', checkoutData)
    console.log(apiServerRequest)

    fetch(serverOrderAddress, apiServerRequest)
        .then(response => {
            if (response.ok){
                alert("Transaction successful")
                dispatch({
                    type: ShoppingCartActionTypes.CLEAR_ALL_ITEMS
                })
                //temp
                localStorage.removeItem('shoppingCart')
                history.push('/')
            }
            else response.text().then(
                (responseText) => alert(responseText)
            )
        })
}

export default checkout
