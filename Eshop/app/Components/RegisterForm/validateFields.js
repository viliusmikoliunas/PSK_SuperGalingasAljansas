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
    
    return errors
}

export default validate
