import { hot } from 'react-hot-loader'
import React from 'react'
import { render } from 'react-dom'
import { Route, Router } from 'react-router-dom'
import './styles.css'

import MainLayout from './Layouts/MainLayout'
import LoginPage from './Layouts/LoginPageLayout'
import RegisterPage from './Layouts/RegisterPageLayout'
import ItemTable from './Components/ItemTable/ItemTable'

import RouteWithLayout from './Components/CustomRouteComponents/RouteWithLayout'

import history from './Redux/history'

const App = () => (
	<Router key={Math.random()} history={history}>
		<div>
			<RouteWithLayout exact path='/' layout={MainLayout} component={ItemTable}/>
			<Route exact path='/login' component={LoginPage}/>
			<Route exact path='/register' component={RegisterPage}/>
		</div>
	</Router>
)

export default hot(module)(App)
