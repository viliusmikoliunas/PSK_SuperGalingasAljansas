import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'
import { reducer as formReducer } from 'redux-form'

import ItemTableReducer from './ItemTableReducer'


const rootReducer = combineReducers({
    ItemTableReducer,
    routing: routerReducer,
    form: formReducer
})

export default rootReducer
