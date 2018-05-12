import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'
import { reducer as formReducer } from 'redux-form'

import ItemTableReducer from './ItemTableReducer'
import LoginReducer from './LoginReducer'
import RegisterReducer from './RegisterReducer'
import UserListReducer from './UserListReducer'


const rootReducer = combineReducers({
    ItemTableReducer,
    LoginReducer,
    RegisterReducer,
    UserListReducer,
    routing: routerReducer,
    form: formReducer
})

export default rootReducer
