import generateRequestWithAuth from '../../FunctionalComponents/httpRequests/generateRequestWithAuth'
import history from '../../Redux/history'
import ShoppingCartActionTypes from '../actionTypes/ShoppingCartActionTypes'


const serverOrderAddress = '/api/orders'

const checkout = (checkoutData) => (dispatch) => {
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
                
            }
            else response.text().then(
                (responseText) => alert(responseText)
            )
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
