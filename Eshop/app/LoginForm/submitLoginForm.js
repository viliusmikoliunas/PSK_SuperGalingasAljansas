import { SubmissionError } from 'redux-form'
import history from '../history'


const registerAddress = '/api/Account/register'

const submit = (values) => {
    console.log(values)
    /*
    api.post(registerAddress, values)
    .then((response) => {
        if(response.ok) {
            alert("User created successfully")
            history.push('/admin')
        }
    })  */
}

export default submit
