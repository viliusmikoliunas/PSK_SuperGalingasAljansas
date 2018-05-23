import generateRequestWithAuth from '../../FunctionalComponents/httpRequests/generateRequestWithAuth'


const address = '/api/users'

const loadForm = () => (dispatch) => {
    const requestAddress = address + '/me'
    const request = generateRequestWithAuth('GET', null)
    fetch(requestAddress, request)
        .then(response => {
            if (response.status === 200){
                response.json()
                    .then(responseJson => {
                        dispatch({
                            type: 'LOAD_EDIT_USER_INFO_FORM',
                            userInfo: responseJson
                        })
                    })
            }
        })
}

export default loadForm
