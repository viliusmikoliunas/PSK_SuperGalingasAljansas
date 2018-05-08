const validate = values => {
    const errors = {}
    if (!values.email){
        errors.email = 'Required'
    }

    if (!values.password){
        errors.password = 'Required'
    }
    else if (values.password.length < 8){
        errors.password = 'Must be 8 characters or more'
    }

    return errors
}

export default validate
