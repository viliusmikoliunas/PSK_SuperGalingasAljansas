const validate = values => {
    const errors = {}
    if (!values.username){
        errors.username = 'Required'
    }

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

    return errors
}

export default validate
