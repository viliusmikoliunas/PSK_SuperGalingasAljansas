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

export const saveCartToDb = (cart) => {
    const cartItems = cart.map(cartItem => {
        return {
            itemId: cartItem.id,
            itemQuantity: cartItem.quantity
        }
    })
    const request = generateRequestWithAuth('PUT', cartItems)
    fetch(shoppingCardAddress, request)
        .then(response => response.text()
            .then(console.log(response))
        )
}

export const loadShoppingCartFromLocalStorage = () => (dispatch) => {
    const cartString = localStorage.getItem('shoppingCart')
    let cart = JSON.parse(cartString)
    if (cart == null){
        cart = []
    }

    dispatch({
        type: ShoppingCartActionTypes.LOAD_SHOPPING_CART,
        shoppingCart: cart
    })
}

export const addNewItem = (item, quantity) => (dispatch) => {
    const newShoppingCartItem = {
        id: item.id,
        quantity: quantity,
        title: item.title,
        price: item.cost,
        imagePath: item.pictureLocation,
        key: item.id
    }
    dispatch({
        type: ShoppingCartActionTypes.ADD_ITEM,
        item: newShoppingCartItem
    })
    alert("Item added to cart")
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