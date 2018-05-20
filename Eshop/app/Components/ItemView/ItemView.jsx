import React from 'react'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import {Table, Button,Input,InputGroup,InputGroupAddon} from 'reactstrap'
import loadItem, {updateItemField, saveUpdatedItem} from '../../Redux/actions/ItemViewActions'
import {addNewItem} from '../../Redux/actions/ShoppingCartActions'
import QuantityInput from '../QuantityInput/QuantityInput'
import loadCartFromDb, {loadShoppingCartFromLocalStorage, clearCart} from '../../Redux/actions/ShoppingCartActions'
import {getUserRoleFromToken} from '../../FunctionalComponents/jwt/parseJwt'

import './ItemViewStyles.css'

import collectionToString from '../../FunctionalComponents/formatting/collectionToString'

import FaEdit from 'react-icons/lib/fa/edit'



class ItemView extends React.Component {
    constructor(props){
        super(props)
        this.onLeave = this.onLeave.bind(this)
        this.state = {
            shoppingCartQuantity: 1,
            fieldEditStates: {
                title: false
            },
            changesWereMade: false,
            inputFields: {
                title: this.props.title
            }
        }
    }

    onLeave(){
        const {loggedIn} = this.props
        //if (loggedIn){
            //send cart to DB
        //}
        //else {
            localStorage.setItem('shoppingCart', JSON.stringify(this.props.shoppingCartItems))
        //}
    }

    componentDidMount() {
        window.addEventListener('beforeunload', this.onLeave)
        const {itemList, dispatchLoadItem, itemId, dispatchLoadCartFromLocalStorage} = this.props
        dispatchLoadItem(itemList, itemId)
        dispatchLoadCartFromLocalStorage()
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

    handleAddToCart(number){
        const {dispatchAddToCart, item} = this.props
        dispatchAddToCart(item, number)
    }

    handleTitleChange(event){
        this.setState({
            inputFields: {
                title: event.target.value
            }
        })
    }

    handleTitleSubmit(event){
        this.setState({
            inputFields: {
                title: event.target.value
            },
            fieldEditStates: {
                title: false
            } ,
            changesWereMade: true
        })
        this.props.dispatchUpdateItemField('title', event.target.value)
    }

    updateItem(){
        const newItem = {
            ...this.props.item,
            title: this.state.inputFields.title 
        }
        this.props.dispatchUpdateItem(newItem)
    }

    render() {
        const {dispatchAddToCart, item, shoppingCartItems} = this.props 
        const {pictureLocation, title, cost, description, categories, traits} = item
        const userRole = getUserRoleFromToken()
        const actionElement = userRole === 'Admin'
            ?   <tr>
                    <td rowSpan="5">
                        {this.state.changesWereMade
                            ? <Button color="warning" onClick={this.updateItem.bind(this)}>Save changes</Button>
                            : <Button disabled color="warning">Save changes</Button>}
                    </td>
                </tr>
            :
            <tr>
                <td rowSpan="4">
                    <QuantityInput
                        initialValue={1}
                        onChange={this.handleQuantityFieldChange.bind(this)}
                    />
                </td>
                <td>
                    <Button color="primary" onClick={() => this.handleAddToCart(this.state.shoppingCartQuantity)}>Add to cart</Button>
                </td>
            </tr>

        const adminEditIcon = userRole === 'Admin'
            ? <FaEdit onClick={() => this.setState({
                fieldEditStates: {
                    title: !this.state.fieldEditStates.title
                }
            })}/>
            : null

        const titleElement = this.state.fieldEditStates.title
            ?   <div>
                    {adminEditIcon} <input 
                        defaultValue={title} 
                        onKeyPress={event => {
                            if (event.key === 'Enter'){
                                this.handleTitleSubmit(event)
                            }
                        }} 
                        onChange={this.handleTitleChange.bind(this)}/>
                </div>
            :   <div>
                    {adminEditIcon}  {title}
                </div>

        return (
            <Table responsive className="itemViewTable">
                <tbody className="itemViewTable-infoBody">
                    <tr>
                        <td rowSpan="5">
                            <img src={pictureLocation}/>
                        </td>
                        <td>{titleElement}</td>
                    </tr>
                    <tr>
                        <td>Cost: {cost} €</td>
                    </tr>
                    <tr>
                        <td>{description || '"No description was provided for this item"'}</td>
                    </tr>
                    <tr>
                        <td>                        
                            <p>Categories:</p>
                            {collectionToString(categories) || "This item doesn't belong to any category"}
                        </td>
                    </tr>
                    <tr>
                    <td>                        
                        <p>Traits:</p>
                        {collectionToString(traits) || "This item doesn't have any traits"}
                    </td>
                    </tr>
                </tbody>
                <tbody className="itemViewTable-actionsBody">
                    {actionElement}
                </tbody>
            </Table>
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
        dispatchUpdateItem: saveUpdatedItem
    }
    ,dispatch)
)(ItemView)
