import generateRequest from '../../FunctionalComponents/httpRequests/generateRequest'
import ItemTableActionTypes from '../actionTypes/ItemTableActions'


const itemsAddress = '/api/items'
const itemsAddressPaginate = (page, limit) => {
    return itemsAddress + '?' + 'page=' + {page} + '&limit=' + {limit}
}

const loadItems = (page,limit) => (dispatch) => {
    const request = generateRequest('GET', null)
    fetch(itemsAddress,request)
        .then((response) => {
            if (response.ok){
                response.json()
                    .then((jsonResponse) => dispatch({
                        type: ItemTableActionTypes.LOAD_ITEMS,
                        items: jsonResponse.items,
                        numberOfAllItems: jsonResponse.allItemsCount
                    }))
            }
            else console.log(response.status + " " + response.statusText)
        })
}

export default loadItems
