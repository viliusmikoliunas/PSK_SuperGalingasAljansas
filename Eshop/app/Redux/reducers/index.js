import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'
import { reducer as formReducer } from 'redux-form'

import ItemTableReducer from './ItemTableReducer'
import LoginReducer from './LoginReducer'
import RegisterReducer from './RegisterReducer'


const rootReducer = combineReducers({
    ItemTableReducer,
    LoginReducer,
    RegisterReducer,
    routing: routerReducer,
    form: formReducer
})

export default rootReducer
