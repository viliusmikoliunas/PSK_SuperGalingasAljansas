import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

import MainPageReducer from './MainPage/MainPageReducer'


const rootReducer = combineReducers({
    MainPageReducer,
    routing: routerReducer
});

export default rootReducer;
