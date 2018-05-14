import ShoppingCartActionTypes from '../actionTypes/ShoppingCartActionTypes'


const initialState = {
    shoppingCart: [
        {
            imagePath: 'https://www.ikea.com/PIAimages/0238241_PE377689_S5.JPG',
            title: 'Kedute',
            price: 10.56,
            quantity: 2,
            id: 1
        },
        {
            imagePath: 'https://www.ikea.com/PIAimages/0238241_PE377689_S5.JPG',
            title: 'Staliukas',
            price: 5.61,
            quantity: 3,
            id: 2
        }
    ]
}

export default (state = initialState, action) => {
    switch(action.type){
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

        default:
            return state
    }
}
