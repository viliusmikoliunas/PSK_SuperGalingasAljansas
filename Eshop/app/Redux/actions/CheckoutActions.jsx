import generateRequestWithAuth from '../../FunctionalComponents/httpRequests/generateRequestWithAuth'
import history from '../../Redux/history'
import ShoppingCartActionTypes from '../actionTypes/ShoppingCartActionTypes'


const serverOrderAddress = '/api/orders'

const checkout = (checkoutData) => (dispatch) => {
    dispatch({
        type: 'PAYMENT_IS_BEING_SENT'
    })
    const apiServerRequest = generateRequestWithAuth('POST', checkoutData)

    fetch(serverOrderAddress, apiServerRequest)
        .then(response => {
            if (response.ok){
                alert("Transaction successful")
                dispatch({
                    type: ShoppingCartActionTypes.CLEAR_ALL_ITEMS
                })
                dispatch({
                    type: 'PAYMENT_SUCCESSFUL'
                })
                //temp
                localStorage.removeItem('shoppingCart')
                history.push('/user/checkout-successful')
            }
            else {
                dispatch({
                    type: 'PAYMENT_FAILED'
                })
                if (response.status === 500){
                    alert('Server error. Please try again later')
                }
                else response.text().then(
                    (responseText) => alert(responseText)
                )
            }
        })
}

export default checkout

export const sendReview = (rating, description) => (dispatch) => {
    const reviewServerAddress = '/api/reviews'
    const reviewBody = generateRequestWithAuth('POST', {
        'stars': rating,
        'description': description
    })
    fetch(reviewServerAddress, reviewBody)
        .then(response => {
            if (response.ok){
                alert('Review added successfully')
                dispatch({
                    type: 'REVIEW_DONE'
                })
                history.push('/')
            }
            else response.text().then(respText => alert(respText))
        })
}
