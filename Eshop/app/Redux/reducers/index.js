import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'
import { reducer as formReducer } from 'redux-form'

import ItemTableReducer from './ItemTableReducer'
import LoginReducer from './LoginReducer'


const rootReducer = combineReducers({
    ItemTableReducer,
    LoginReducer,
    routing: routerReducer,
    form: formReducer
})

export default rootReducer
