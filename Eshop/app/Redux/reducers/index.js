import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'
import { reducer as formReducer } from 'redux-form'

import ItemTableReducer from './ItemTableReducer'
import LoginReducer from './LoginReducer'
import RegisterReducer from './RegisterReducer'
import UserListReducer from './UserListReducer'
import UserBlockStatusReducer from './UserListReducer'


const rootReducer = combineReducers({
    ItemTableReducer,
    LoginReducer,
    RegisterReducer,
    UserBlockStatusReducer,
    UserListReducer,
    routing: routerReducer,
    form: formReducer
})

export default rootReducer
