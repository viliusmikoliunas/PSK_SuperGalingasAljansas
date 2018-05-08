import { hot } from 'react-hot-loader'
import React from 'react'
import { render } from 'react-dom'
import { Route, Router } from 'react-router-dom'
import './styles.css'

import MainLayout from './MainLayout'
import LoginPage from './LoginPage'
import MainPage from './MainPage/MainPage'

import RouteWithLayout from './customRouteComponents/RouteWithLayout'

import history from './history'

const App = () => (
	<Router key={Math.random()} history={history}>
		<div>
			<RouteWithLayout exact path='/' layout={MainLayout} component={MainPage}/>
			<Route exact path='/login' component={LoginPage}/>
		</div>
	</Router>
);

export default hot(module)(App)
