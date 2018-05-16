import isCreditCardNumberValid from '../../../FunctionalComponents/validity/creditCardNumberValidation'


const validate = values => {
    const errors = {}

    if (!values.number){
        errors.number = 'Required'
    }
    else if (!/^[0-9]{16}$/.test(values.number.replace(/ /g,''))){
        errors.number = 'Must be 16 digits'
    }
    else if (!isCreditCardNumberValid(values.number.replace(/ /g,''))){
        errors.number = 'Credit card number not valid'
    }

    if (!values.holder){
        errors.holder = 'Required'
    }
    else if (values.holder.length < 2){
        errors.holder = 'Name too short to be valid for credit card payment'
    }
    else if (values.holder.length > 32){
        errors.holder = 'Name too long to be valid for credit card payment'
    }
    else if (!/^([a-z]|[A-Z]|\s|'){2,32}$/.test(values.holder)){
        errors.holder = 'Name contains non character symbols'
    }


    if (!values.exp_year){
        errors.exp_year = 'Required'
    }
    else if (values.exp_year < 1970){
        errors.exp_year = 'Incorrect year'
    }

    if (!values.exp_month){
        errors.exp_month = 'Required'
    }
    else if (values.exp_month < 1 || values.exp_month > 12){
        errors.exp_month = 'Incorrect month'
    }

    if (!values.cvv){
        errors.cvv = 'Required'
    }
    else if (!/^[0-9]{3}$/.test(values.cvv)){
        errors.cvv = 'Must 3 digits'
    }
    else if (values.cvv.length !== 3){
        errors.cvv = 'Must 3 digits'
    }

    return errors
}

export default validate
