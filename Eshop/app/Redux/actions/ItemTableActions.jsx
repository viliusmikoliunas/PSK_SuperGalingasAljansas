import generateRequest from '../../FunctionalComponents/httpRequests/generateRequest'
import ItemTableActionTypes from '../actionTypes/ItemTableActions'


const itemsAddress = '/api/items'
const itemsAddressPaginate = (page, limit) => {
    const pageStr = page.toString()
    const limitStr = limit.toString()
    return itemsAddress + '?' + 'page=' + pageStr + '&limit=' + limitStr
}

const loadItems = (page,limit) => (dispatch) => {
    const request = generateRequest('GET', null)
    let requestAddress = itemsAddress
    if (page != null && limit != null){
        requestAddress = itemsAddressPaginate(page, limit)
    }
    fetch(requestAddress,request)
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
