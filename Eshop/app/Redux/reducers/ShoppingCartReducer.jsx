import ShoppingCartActionTypes from '../actionTypes/ShoppingCartActionTypes'


const initialState = {
    shoppingCart: [
        {
            imagePath: 'https://www.ikea.com/PIAimages/0238241_PE377689_S5.JPG',
            title: 'Kedute',
            price: 10.56,
            quantity: 2
        }
    ]
}

export default (state = initialState, action) => {
    switch(action.type){
        default:
            return state
    }
}