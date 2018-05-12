import generateRequestWithAuth from '../../FunctionalComponents/httpRequests/generateRequestWithAuth'


const address = '/api/users'

const loadUsers = () => (dispatch) => {
    fetch(address,generateRequestWithAuth('GET', undefined))
        .then((response) => console.log(response))
}
