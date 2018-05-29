import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'
import { reducer as formReducer } from 'redux-form'

import ItemTableReducer from './ItemTableReducer'
import LoginReducer from './LoginReducer'
import RegisterReducer from './RegisterReducer'
import UserListReducer from './UserListReducer'
import UserBlockStatusReducer from './UserListReducer'
import ShoppingCartReducer from './ShoppingCartReducer'
import ItemViewReducer from './ItemViewReducer'
import OrderListReducer from './OrderListReducer'
import UserInfoFormReducer from './UserInfoFormReducer'
import ShoppingHistoryReducer from './ShoppingHistoryReducer'


const rootReducer = combineReducers({
    ItemTableReducer,
    ItemViewReducer,
    LoginReducer,
    OrderListReducer,
    RegisterReducer,
    ShoppingCartReducer,
    ShoppingHistoryReducer,
    UserBlockStatusReducer,
    UserInfoFormReducer,
    UserListReducer,
    routing: routerReducer,
    form: formReducer
})

export default rootReducer
