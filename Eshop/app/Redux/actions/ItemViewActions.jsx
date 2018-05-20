import ItemViewActions from '../actionTypes/ItemViewActionTypes'
import generateRequest from '../../FunctionalComponents/httpRequests/generateRequest'
import generateRequestWithAuth from '../../FunctionalComponents/httpRequests/generateRequestWithAuth'
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

export const updateItemField = (field, value) => (dispatch) => {
    dispatch({
        type: ItemViewActions.CHANGE_FIELD_VALUE,
        field: field,
        value: value
    })
}

export const saveUpdatedItem = (item) => (dispatch) => {
    const request = generateRequestWithAuth('PUT', item)
    fetch(itemAddress, request)
        .then(response => {
            if (response.ok) {
                alert('item added successfully')
                dispatch({
                    type: ItemViewActions.LOAD_ITEM,
                    item: item
                })
                //history.push('/')
            }
            else alert('failed to update item')
        })
}

export default loadItem
