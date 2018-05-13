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


class App extends Component{

	componentDidMount(){
		//console.log(this.props.loggedIn)
	}

	render(){
		return(
			<Router key={Math.random()} history={history}>
				<div>
					<RouteWithLayout exact path='/' layout={MainLayout} component={ItemTable}/>
					<Route exact path='/login' component={LoginPage}/>
					<Route exact path='/register' component={RegisterPage}/>
					<Route path ='/admin' component={adminRoute}/>
				</div>
			</Router>
		)
	}
}
const connectedApp = connect(
    (state) => ({
        loggedIn: state.LoginReducer.loggedIn
    }),
    /*(dispatch) => bindActionCreators({
        dispatchLoadList: loadUsers,
        dispatchBlockUser: blockUser
    }
    ,dispatch)*/null
)(App)

export default hot(module)(connectedApp)
