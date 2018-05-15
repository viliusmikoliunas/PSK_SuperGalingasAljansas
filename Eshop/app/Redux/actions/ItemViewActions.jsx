import ItemViewActions from '../actionTypes/ItemViewActionTypes'
import generateRequest from '../../FunctionalComponents/httpRequests/generateRequest'
import history from '../history'


const loadItem = (list, id) => (dispatch) => {
    if(list == null){
        downloadItemInfo(id)(dispatch)
        return 
    }
    const item = list.find(item => item.id == id)
    if (item == null){
        downloadItemInfo(id)(dispatch)
        return 
    }

    dispatch({
        type: ItemViewActions.LOAD_ITEM,
        item: item
    })
}

const itemAddress = '/api/items'

const downloadItemInfo = (itemId) => (dispatch) => {
    const requestAddress = itemAddress + '/' + itemId
    const request = generateRequest('GET', null)
    fetch(requestAddress, request)
        .then((response) => {
            if (response.status === 200){
                response.json()
                    .then((jsonResponse) => dispatch({
                        type: ItemViewActions.LOAD_ITEM,
                        item: jsonResponse
                    }))
            }
            else {
                alert("item with such id doesnt exist")
                history.push('/')
                return
            }
        })
}

export default loadItem
