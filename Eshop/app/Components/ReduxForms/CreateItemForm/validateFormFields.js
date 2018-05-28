const validate = values => {
    const errors = {}
    if (!values.title){
        errors.title = 'Required'
    }

    if (!values.cost){
        errors.cost = 'Required'
    }
    else if(!/^[1-9][0-9]{0,3}(\.[0-9][0-9]?)?$/.test(values.cost)){
        errors.cost = 'Bad cost format'
    }

    return errors
}

export default validate
