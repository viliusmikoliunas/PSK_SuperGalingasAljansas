const initialState = {
    paymentSuccessful: false
}

export default (state = initialState, action) => {
    switch (action.type){

        case 'PAYMENT_SUCCESSFUL':
            return {
                ...state,
                paymentSuccessful: true
            }        

        default:
            return state
    }
}
