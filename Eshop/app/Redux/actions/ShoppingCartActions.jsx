import ShoppingCartActionTypes from '../actionTypes/ShoppingCartActionTypes'
import generateRequestWithAuth from '../../FunctionalComponents/httpRequests/generateRequestWithAuth'


const shoppingCardAddress = '/api/user/cart'

const loadCartFromDb = () => (dispatch) => {
    const request = generateRequestWithAuth('GET', null)
    fetch(shoppingCardAddress,request)
        .then(response => {
            if (response.ok){
                if (response.status === 204){
                    dispatch({
                        type: ShoppingCartActionTypes.LOAD_SHOPPING_CART,
                        shoppingCart: []
                    })
                }
                else{
                    response.json()
                    .then(itemList => {
                        dispatch({
                            type: ShoppingCartActionTypes.LOAD_SHOPPING_CART,
                            shoppingCart: itemList
                        })
                    })
                }
            }
            else console.log(response.status + " " + response.statusText)
        })
        .catch((err) => {
            console.log("db error")
        })
}

export default loadCartFromDb

export const saveCartToDb = (cart) => (dispatch) => {
    const cartItems = cart.map(cartItem => {
        return {
            itemId: cartItem.id,
            itemQuantity: cartItem.quantity
        }
    })
    const request = generateRequestWithAuth('PUT', cartItems)
    fetch(shoppingCardAddress, request)
        .then(response => {
            dispatch({
                type: ShoppingCartActionTypes.LOAD_SHOPPING_CART,
                shoppingCart: cart
            })
            localStorage.removeItem('shoppingCart')
        })
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

const formatShoppingCartItem = (item,quantity) => {
    return {
        id: item.id,
        quantity: quantity,
        title: item.title,
        price: item.cost,
        imagePath: item.pictureLocation,
        key: item.id
    }
}

export const addNewItem = (item, quantity) => (dispatch) => {
    const newShoppingCartItem = formatShoppingCartItem(item, quantity)
    dispatch({
        type: ShoppingCartActionTypes.ADD_ITEM,
        item: newShoppingCartItem
    })
}

export const addSingleItemToShoppingCartInDb = (item, quantity, itemId) => (dispatch) => {
    const newShoppingCartItem = {
        itemId: itemId,
        itemQuantity: quantity
    }
    const request = generateRequestWithAuth('POST', newShoppingCartItem)
    fetch(shoppingCardAddress, request)
        .then(response => {
            if (response.ok){
                dispatch({
                    type: ShoppingCartActionTypes.ADD_ITEM,
                    item: formatShoppingCartItem(item, quantity)
                })
            }
            else {
                
            }
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