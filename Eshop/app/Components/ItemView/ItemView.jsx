import React from 'react'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import {Table, Button,Input,InputGroup,InputGroupAddon} from 'reactstrap'
import loadItem, {updateItemField, saveUpdatedItem, deleteItem} from '../../Redux/actions/ItemViewActions'
import {addNewItem} from '../../Redux/actions/ShoppingCartActions'
import QuantityInput from '../QuantityInput/QuantityInput'
import loadCartFromDb, {loadShoppingCartFromLocalStorage, clearCart, addSingleItemToShoppingCartInDb} from '../../Redux/actions/ShoppingCartActions'
import {getUserRoleFromToken} from '../../FunctionalComponents/jwt/parseJwt'
import './ItemViewStyles.css'
import collectionToString from '../../FunctionalComponents/formatting/collectionToString'
import ItemViewField from './ItemViewField'
import toFixed from '../../FunctionalComponents/formatting/toFixed'


class ItemView extends React.Component {
    constructor(props){
        super(props)
        this.onLeave = this.onLeave.bind(this)
        this.state = {
            totalQuantity: 0,
            shoppingCartQuantity: 1,
            changesWereMade: false,
            inputFields: {
                title: this.props.title,
                cost: this.props.cost,
                description: this.props.description,
                pictureLocation: this.props.pictureLocation
            }
        }
    }

    onLeave(){
        const {loggedIn, dispatchAddSingleItemToCart, item, itemId} = this.props
        if (this.state.totalQuantity > 0){
            if (loggedIn){
                dispatchAddSingleItemToCart(item, this.state.totalQuantity, itemId)
            }
            else {
                localStorage.setItem('shoppingCart', JSON.stringify(this.props.shoppingCartItems))
            }
        }
    }

    componentDidMount() {
        window.addEventListener('beforeunload', this.onLeave)
        const {itemList, dispatchLoadItem, itemId,loggedIn, dispatchLoadCartFromDb, dispatchLoadCartFromLocalStorage} = this.props
        dispatchLoadItem(itemList, itemId)
        
        if (loggedIn){
            dispatchLoadCartFromDb()
        }
        else {
            dispatchLoadCartFromLocalStorage()
        }
    }

    componentWillUnmount(){
        this.onLeave()
        window.removeEventListener('beforeunload', this.onLeave)
    }

    handleQuantityFieldChange(newValue){
        this.setState({
            shoppingCartQuantity: newValue
        })
    }

    handleAddToCart(){
        const number = this.state.shoppingCartQuantity
        const {item, dispatchAddToCart} = this.props
        this.setState({
            totalQuantity: this.state.totalQuantity + number
        })
        dispatchAddToCart(item, number)
        alert("Item added to shopping cart")
    }

    updateItem(){
        this.props.dispatchUpdateItem(this.props.item)
    }

    handleFieldValueChange(key, value){
        this.setState({
            inputFields: {
                ...this.state.inputFields,
                [key]: value
            },
            changesWereMade: true
        })
    }

    render() {
        const {dispatchAddToCart, item, shoppingCartItems, itemId} = this.props 
        const {pictureLocation, title, cost, description, itemCategories, itemTraits} = item
        const userRole = getUserRoleFromToken()
        const actionElement = userRole === 'Admin'
            ?   <div>
                    {this.state.changesWereMade
                        ? <Button color="warning" onClick={this.updateItem.bind(this)}>Save changes</Button>
                        : <Button disabled color="warning">Save changes</Button>}
                
                    <Button color="danger" onClick={() => deleteItem(itemId)}>Delete item</Button>
                </div>
            :
            <div>
                <QuantityInput
                    initialValue={1}
                    onChange={this.handleQuantityFieldChange.bind(this)}
                />
                <Button color="primary" onClick={() => this.handleAddToCart()}>Add to cart</Button>
            </div>

        const titleElement = userRole === 'Admin' 
            ?
            <ItemViewField
                callback={this.handleFieldValueChange.bind(this)}
                initialValue={title}
                fieldTitle='title'
            />
            : <td>{title}</td>

        const costElement = userRole === 'Admin'
            ?
            <ItemViewField
                callback={this.handleFieldValueChange.bind(this)}
                initialValue={cost}
                fieldTitle='cost'
                pretext='Cost: '
            />
            : <td>Cost: {toFixed(cost || 0, 2)} €</td>

        const descriptionElement = userRole === 'Admin'
            ?
            <ItemViewField
                callback={this.handleFieldValueChange.bind(this)}
                initialValue={description}
                fieldTitle='description'
            />
            : <td>{description}</td>
        
        const pictureLocationElement = userRole === 'Admin'
            ?
            <tr>                       
                <ItemViewField
                    callback={this.handleFieldValueChange.bind(this)}
                    initialValue={pictureLocation}
                    fieldTitle='pictureLocation'
                    pretext='Picture location link: '
                />
            </tr>
            : null
        
        return (
            <div>
                <Table responsive className="itemViewTable">
                    <tbody className="itemViewTable-infoBody">
                        <tr>
                            <td rowSpan={userRole === 'Admin' ? '6' : '5'}>
                                <img src={pictureLocation}/>
                            </td>
                            {titleElement}
                        </tr>
                        <tr>
                            {costElement}
                        </tr>
                        <tr>
                            {descriptionElement || <td>'"No description was provided for this item"'</td>}
                        </tr>
                        <tr>
                            <td>                        
                                <p>Categories:</p>
                                {collectionToString(itemCategories) || "This item doesn't belong to any category"}
                            </td>
                        </tr>
                        <tr>
                            <td>                        
                                <p>Properties:</p>
                                {collectionToString(itemTraits) || "This item doesn't have any properties"}
                            </td>
                        </tr>
                        {pictureLocationElement}
                    </tbody>
                </Table>
                {actionElement}
            </div>
        )
    }
}

export default connect(
    (state) => ({
        loggedIn: state.LoginReducer.loggedIn,
        itemList: state.ItemTableReducer.items,
        item: state.ItemViewReducer.item,
        shoppingCartItems: state.ShoppingCartReducer.shoppingCart
    }),
    (dispatch) => bindActionCreators({
        dispatchLoadItem: loadItem,
        dispatchAddToCart: addNewItem,
        dispatchLoadCartFromDb: loadCartFromDb,
        dispatchLoadCartFromLocalStorage: loadShoppingCartFromLocalStorage,
        dispatchUpdateItemField: updateItemField,
        dispatchUpdateItem: saveUpdatedItem,
        dispatchAddSingleItemToCart: addSingleItemToShoppingCartInDb
    }
    ,dispatch)
)(ItemView)
