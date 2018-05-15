import ItemViewActions from '../actionTypes/ItemViewActionTypes'


const loadItem = (list, id) => (dispatch) => {
    console.log(list)
    if(list == null){
        console.log("list null")
    }
    const item = list.find(item => item.id == id)
    if (item == null){
        console.log("item null")
    }
    else {
        console.log("dispatch")
        dispatch({
            type: ItemViewActions.LOAD_ITEM,
            item: item
        })
    }
}

const downloadItemInfo = (itemId) => {

}

export default loadItem