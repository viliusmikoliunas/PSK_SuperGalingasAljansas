const initialState = {
    paymentSuccessful: false,
    paymentIsProcessing: false
}

export default (state = initialState, action) => {
    switch (action.type){

        case 'PAYMENT_SUCCESSFUL':
            return {
                ...state,
                paymentSuccessful: true,
                paymentIsProcessing: false
            }        

        case 'PAYMENT_IS_BEING_SENT':
            return{
                ...state,
                paymentIsProcessing: true
            }

        case 'PAYMENT_FAILED':
            return {
                ...state,
                paymentIsProcessing: false
            }

        case 'REVIEW_DONE':
            return{
                ... state,
                paymentSuccessful: false
            }

        default:
            return state
    }
}
