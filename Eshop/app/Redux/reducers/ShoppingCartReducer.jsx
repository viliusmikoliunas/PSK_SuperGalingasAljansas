import ShoppingCartActionTypes from '../actionTypes/ShoppingCartActionTypes'


const initialState = {
    shoppingCart: []
}

export default (state = initialState, action) => {
    switch(action.type){
        case(ShoppingCartActionTypes.LOAD_SHOPPING_CART):{
            return {
                ...state,
                shoppingCart: action.shoppingCart
            }
        }

        case(ShoppingCartActionTypes.INCREMENT_QUANTITY):{
            return{
                ...state,
                shoppingCart: state.shoppingCart.map(shoppingCartItem => {
                    if (shoppingCartItem.id === action.shoppingCartItemId){
                        return {
                            ...shoppingCartItem,
                            quantity: shoppingCartItem.quantity+1
                        }
                    }
                    return shoppingCartItem
                })
            }
        }

        case(ShoppingCartActionTypes.DECREMENT_QUANTITY):{
            return{
                ...state,
                shoppingCart: state.shoppingCart.map(shoppingCartItem => {
                    if (shoppingCartItem.id === action.shoppingCartItemId){
                        return {
                            ...shoppingCartItem,
                            quantity: shoppingCartItem.quantity > 1 
                                ? shoppingCartItem.quantity-1 
                                : shoppingCartItem.quantity
                        }
                    }
                    return shoppingCartItem
                })
            }
        }

        case(ShoppingCartActionTypes.UPDATE_QUANTITY_FIELD):{
            return{
                ...state,
                shoppingCart: state.shoppingCart.map(shoppingCartItem => {
                    if (shoppingCartItem.id === action.shoppingCartItemId){
                        return {
                            ...shoppingCartItem,
                            quantity: action.newQuantity
                        }
                    }
                    return shoppingCartItem
                })
            }
        }

        case (ShoppingCartActionTypes.REMOVE_ITEM):{
            return{
                ...state,
                shoppingCart: state.shoppingCart.filter(item => item.id !== action.shoppingCartItemId)
            }
        }

        case (ShoppingCartActionTypes.CLEAR_ALL_ITEMS):{
            return{
                ...state,
                shoppingCart: []
            }
        }

        default:
            return state
    }
}
