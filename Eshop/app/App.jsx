//general
import { hot } from 'react-hot-loader'
import React, {Component} from 'react'
import { render } from 'react-dom'
import { Route, Router, Switch, Redirect } from 'react-router-dom'
import './styles.css'
import history from './Redux/history'
//layouts
import MainLayout from './Layouts/MainLayout'
import LoginPage from './Layouts/LoginPageLayout'
import RegisterPage from './Layouts/RegisterPageLayout'
import CheckoutPage from './Layouts/CheckoutLayout'
//components
import ItemTable from './Components/ItemTable/ItemTable'
import RouteWithLayout from './Components/CustomRouteComponents/RouteWithLayout'
//routes
import adminRoute from './Routes/AdminRoutes'
import userRoute from './Routes/UserRoutes'
import itemRoute from './Routes/ItemRoutes'


class App extends Component{

	render(){
		return(
			<Router key={Math.random()} history={history}>
				<div>
					<RouteWithLayout exact path='/' layout={MainLayout} component={ItemTable}/>
					<Route exact path='/login' render={() => <LoginPage/>}/>
					<Route exact path='/register' render={() => <RegisterPage/>}/>
					<Route path ='/admin' component={adminRoute}/>
					<Route path ='/user' component={userRoute}/>
					<Route path ='/checkout' render={() => <CheckoutPage/>}/>

					<Route exact path='/item' render={() => <Redirect to='/' />} />
					<RouteWithLayout exact path='/item/:id' layout={MainLayout} component={itemRoute} />
				</div>
			</Router>
		)
	}
}

export default hot(module)(App)
