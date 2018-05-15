import ShoppingCartActionTypes from '../actionTypes/ShoppingCartActionTypes'
import generateRequestWithAuth from '../../FunctionalComponents/httpRequests/generateRequestWithAuth'


const shoppingCardAddress = '/api/user/cart'

const loadCartFromDb = () => (dispatch) => {
    const request = generateRequestWithAuth('GET', null)
    fetch(shoppingCardAddress,request)
        .then((response) => {
            if (response.ok){
                response.json()
                    .then((jsonResponse) => dispatch({
                        type: ShoppingCartActionTypes.LOAD_SHOPPING_CART,
                        shoppingCart: jsonResponse
                    }))
            }
            else console.log(response.status + " " + response.statusText)
        })
}

export default loadCartFromDb

export const loadShoppingCartFromLocalStorage = () => (dispatch) => {
    const cartString = localStorage.getItem('shoppingCart')
    let cart = JSON.parse(cartString)
    if (cart.length < 1){
        cart = [
            {
                imagePath: 'https://www.ikea.com/PIAimages/0238241_PE377689_S5.JPG',
                title: 'Placeholder',
                price: 10.56,
                quantity: 2,
                id: 1
            },
            {
                imagePath: 'https://www.ikea.com/PIAimages/0238241_PE377689_S5.JPG',
                title: 'Placeholder',
                price: 5.61,
                quantity: 3,
                id: 2
            }
        ]
    }

    dispatch({
        type: ShoppingCartActionTypes.LOAD_SHOPPING_CART,
        shoppingCart: cart
    })
}

export const incrementQuantity = (shoppingCartItemId) => (dispatch) => {
    dispatch({
        type: ShoppingCartActionTypes.INCREMENT_QUANTITY,
        shoppingCartItemId: shoppingCartItemId
    })
}

export const decrementQuantity = (shoppingCartItemId) => (dispatch) => {
    dispatch({
        type: ShoppingCartActionTypes.DECREMENT_QUANTITY,
        shoppingCartItemId: shoppingCartItemId
    })
}

export const updateQuantity = (shoppingCartItemId, newQuantity) => (dispatch) => {
    dispatch({
        type: ShoppingCartActionTypes.UPDATE_QUANTITY_FIELD,
        shoppingCartItemId: shoppingCartItemId,
        newQuantity: newQuantity
    })
}

export const removeFromCart = (shoppingCartItemId) => (dispatch) => {
    dispatch({
        type: ShoppingCartActionTypes.REMOVE_ITEM,
        shoppingCartItemId: shoppingCartItemId
    })
}

export const clearCart = () => (dispatch) => {
    dispatch({
        type: ShoppingCartActionTypes.CLEAR_ALL_ITEMS
    })
}