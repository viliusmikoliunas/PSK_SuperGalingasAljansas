import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'
import { reducer as formReducer } from 'redux-form'

import MainPageReducer from './MainPage/MainPageReducer'


const rootReducer = combineReducers({
    MainPageReducer,
    routing: routerReducer,
    form: formReducer
})

export default rootReducer
