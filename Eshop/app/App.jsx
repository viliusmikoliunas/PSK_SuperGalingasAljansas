//general
import { hot } from 'react-hot-loader'
import React, {Component} from 'react'
import { render } from 'react-dom'
import { Route, Router } from 'react-router-dom'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import './styles.css'
import history from './Redux/history'
//layouts
import MainLayout from './Layouts/MainLayout'
import LoginPage from './Layouts/LoginPageLayout'
import RegisterPage from './Layouts/RegisterPageLayout'
//components
import ItemTable from './Components/ItemTable/ItemTable'
import RouteWithLayout from './Components/CustomRouteComponents/RouteWithLayout'
//routes
import adminRoute from './Routes/AdminRoutes'
import userRoute from './Routes/UserRoutes'


class App extends Component{

	render(){
		return(
			<Router key={Math.random()} history={history}>
				<div>
					<RouteWithLayout exact path='/' layout={MainLayout} component={ItemTable}/>
					<Route exact path='/login' component={LoginPage}/>
					<Route exact path='/register' component={RegisterPage}/>
					<Route path ='/admin' component={adminRoute}/>
					<Route path ='/user' component={userRoute}/>
				</div>
			</Router>
		)
	}
}

export default hot(module)(App)
