import ShoppingCartActionTypes from '../actionTypes/ShoppingCartActionTypes'


const initialState = {
    shoppingCart: []
}

export default (state = initialState, action) => {
    switch(action.type){
        case ShoppingCartActionTypes.LOAD_SHOPPING_CART:{
            return {
                ...state,
                shoppingCart: action.shoppingCart
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

        case ShoppingCartActionTypes.ADD_ITEM:{
            console.log('add item reducer fired')
            const itemWithId = state.shoppingCart.find(item => item.id === action.item.id)
            if (itemWithId != null){
                action.item.quantity += itemWithId.quantity
            }
            else state.shoppingCart.push(action.item)
            return{
                ...state,
                shoppingCart: state.shoppingCart.map(item => {
                    if (item.id !== action.item.id){
                        return item
                    }
                    else return action.item
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

        case ShoppingCartActionTypes.INCREMENT_QUANTITY:{
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

        default:
            return state
    }
}
