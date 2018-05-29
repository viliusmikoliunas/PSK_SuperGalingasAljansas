import generateRequestWithAuth from '../../FunctionalComponents/httpRequests/generateRequestWithAuth'


const address = '/api/purchase-history'

const loadShoppingHistory = () => (dispatch) => {
    const request = generateRequestWithAuth('GET', null)
    fetch(address, request)
        .then(response => {
            if (response.ok){
                response.json()
                    .then(respJson => {
                        dispatch({
                            type: 'LOAD_SHOPPING_HISTORY',
                            historyList: respJson
                        })
                    })
            }
            else response.text().then(resp => alert(resp))
        })
}

export default loadShoppingHistory
