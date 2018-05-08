import history from '../history'


const registerAddress = '/api/account/login'

const requestParams = (bodyVal) => {
    return({
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(bodyVal)
    })
}

const login = (values) => {
    fetch(registerAddress,requestParams(values))
        .then(data => {
            if (data.status === 200){
                data.text().then(
                    (jwtToken) => {
                        localStorage.setItem('jwtToken', jwtToken)
                    }
                )
                history.push('/')
            }
            else if (data.status === 401){
                alert("username and password doesn't match")
            }
            else {
                alert("login failed for unknown reasons")
            }
        })
}

export default login
