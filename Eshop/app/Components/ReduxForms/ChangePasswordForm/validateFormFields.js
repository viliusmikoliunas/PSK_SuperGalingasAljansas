const validate = values => {
    const errors = {}

    if (!values.currentPassword){
        errors.currentPassword = 'Required'
    }
    
    if (!values.newPassword){
        errors.newPassword = 'Required'
    }
    else if (values.newPassword.length < 8){
        errors.newPassword = 'Must be 8 characters or more'
    }
    else if(!/[a-z]/.test(values.newPassword)){
        errors.newPassword = 'Password must contain a lowercase letter'
    }
    else if(!/[A-Z]/.test(values.newPassword)){
        errors.newPassword = 'Password must contain an uppercase letter'
    }
    else if(!/[^a-zA-Z0-9]/.test(values.newPassword)){
        errors.newPassword = 'Password must contain a non alphanumeric symbol'
    }

    if (!values.newPassword2){
        errors.newPassword2 = 'Required'
    }
    else if (values.newPassword !== values.newPassword2){
        errors.newPassword2 = 'Passwords must match'
    }

    return errors
}

export default validate
