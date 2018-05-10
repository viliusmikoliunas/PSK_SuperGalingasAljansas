import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import App from './App'
import 'bootstrap/dist/css/bootstrap.min.css'
import store from './Redux/store'


render(
    <Provider store={store}>
        <App/>
    </Provider>,
    document.querySelector('.app')
)
