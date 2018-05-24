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

export const updateUserInfo = (newInfo) => (dispatch) => {
    const requestAddress = '/api/account/updateinfo'
    const request = generateRequestWithAuth('PUT', newInfo)
    fetch(requestAddress, request)
        .then(response => {
            if (response.status === 200){
                alert('User info updated successfully')
            }
            else response.text()
                .then(responseText => {
                    dispatch({
                        type: 'ERROR_EDIT_USER_INFO_FORM',
                        error: responseText
                    })
                })
        }
    )
}
