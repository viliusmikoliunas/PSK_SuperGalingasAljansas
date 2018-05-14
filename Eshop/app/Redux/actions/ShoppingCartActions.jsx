import ShoppingCartActionTypes from '../actionTypes/ShoppingCartActionTypes'


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
