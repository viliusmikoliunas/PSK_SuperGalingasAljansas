import isCreditCardNumberValid from '../../../FunctionalComponents/validity/creditCardNumberValidation'


const validate = values => {
    const errors = {}
    /*
    "number": "4111111111111111", input
    "holder": "Vardenis Pavardenis", input/pre-load
    "exp_year": 2018, //input
    "exp_month": 9, // input
    "cvv": "123" // input
    */
    if (!values.number){
        errors.number = 'Required'
    }
    else if (!/^[0-9]{16}$/.test(values.number.replace(/ /g,''))){
        errors.number = 'Must be 16 digits'
    }
    else if (!isCreditCardNumberValid(values.number.replace(/ /g,''))){
        errors.number = 'Credit card number not valid'
    }

/*
    if (!values.password){
        errors.password = 'Required'
    }
    else if (values.password.length < 8){
        errors.password = 'Must be 8 characters or more'
    }
    else if(!/[a-z]/.test(values.password)){
        errors.password = 'Password must contain a lowercase letter'
    }
    else if(!/[A-Z]/.test(values.password)){
        errors.password = 'Password must contain an uppercase letter'
    }
    else if(!/[^a-zA-Z0-9]/.test(values.password)){
        errors.password = 'Password must contain a non alphanumeric symbol'
    }

    if (!values.password2){
        errors.password2 = 'Required'
    }
    else if (values.password !== values.password2){
        errors.password2 = 'Passwords must match'
    }

    if (!values.email){
        errors.email = 'Required'
    }

    if (values.firstname && values.lastname){
        if (values.firstname.length + values.lastname.length > 31){
            errors.lastname = 'Full name too long to be valid for credit card payment'
        }
    }
*/
    return errors
}

export default validate
