import generateRequest from '../../FunctionalComponents/httpRequests/generateRequest'
import ItemTableActionTypes from '../actionTypes/ItemTableActions'


const itemsAddress = '/api/items'

const loadItems = () => (dispatch) => {
    const request = generateRequest('GET', null)
    fetch(itemsAddress,request)
        .then((response) => {
            if (response.ok){
                response.json()
                    .then((jsonResponse) => dispatch({
                        type: ItemTableActionTypes.LOAD_ITEMS,
                        items: jsonResponse
                    }))
            }
            else console.log(response.status + " " + response.statusText)
        })
}

export default loadItems
