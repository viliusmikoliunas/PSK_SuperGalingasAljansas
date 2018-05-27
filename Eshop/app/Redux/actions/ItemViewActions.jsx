import ItemViewActions from '../actionTypes/ItemViewActionTypes'
import generateRequest from '../../FunctionalComponents/httpRequests/generateRequest'
import generateRequestWithAuth from '../../FunctionalComponents/httpRequests/generateRequestWithAuth'
import history from '../history'


const loadItem = (list, id) => (dispatch) => {
    if(list == null || list.length == 0){
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

export default loadItem

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
                response.text()
                    .then(responseJson => {
                        dispatch({
                            type: ItemViewActions.LOAD_ITEM,
                            item: item
                        })
                        alert(responseJson)
                    })
            }
            else response.text().then(
                responseJson => alert(responseJson)
            )
        })
}

export const createNewItem = (item) => {
    const itemToCreate = {
        ...item,
        cost: parseFloat(item.cost)
    }
    const request = generateRequestWithAuth('POST', item)
    fetch(itemAddress, request)
        .then(response => {
            if (response.ok){
                alert('item created successfully')
                history.push('/admin')
            }
            else response.text()
                .then(responseText => alert(responseText))
        })
}

export const deleteItem = (itemId) => {
    const requestAddress = itemAddress + '/' + itemId
    const request = generateRequestWithAuth('DELETE', null)
    fetch(requestAddress, request)
        .then((response) => {
            if (response.status === 200){
                alert('item deleted successfully')
                history.push('/')
            }
            else {
                response.text(responseText => {
                    alert(responseText)
                    history.push('/')
                    return
                })
            }
        })
}
