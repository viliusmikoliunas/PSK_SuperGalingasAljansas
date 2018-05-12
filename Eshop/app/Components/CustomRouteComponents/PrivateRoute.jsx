import React, {Component} from 'react'
import { bindActionCreators } from 'redux'
import {connect} from 'react-redux'
import {Redirect, Route, withRouter} from 'react-router-dom'
import RouteWithLayout from './RouteWithLayout'

class PrivateRoute extends Component {

    checkPrivilege(userRole, approvedRolesForThisPath){
        const uppercaseRoles = approvedRolesForThisPath.map(title => title.toUpperCase());
        const currentRole = userRole.toUpperCase();
        return (uppercaseRoles.indexOf(currentRole) > -1);
    }

    render(){
        const { component: Component, roles: permisedRoles, layout, ...rest } = this.props;
        const currentRole = this.props.loggedIn
            ? this.props.loggedIn.role : null;
        
        const canUserAccessThisRoute = 
            currentRole && this.checkPrivilege(this.props.loggedIn.role, permisedRoles);
        
            //if user has no role he is redirected to login page
        //else means user doesn't have permission to access resource, thus he is redirected to start of admin
        const redirectPath = currentRole == null
            ? '/login' : '/admin';
        
        return (
            <Route {...rest} render={(props) => (<RouteWithLayout layout={layout} component={Component} {...props}/>/*
                this.props.loggingIn
                ? null
                : 
                ( canUserAccessThisRoute
                    ? <RouteWithLayout layout={layout} component={Component} {...props}/>
                    : <Redirect to={{
                        pathname: redirectPath,
                        state: { from: props.location }
                    }}/>
                )
            */)} />
        )
    }   
}

const connectedPrivateRoute = connect(
    (state) => ({
        loggingIn: state.LoginReducer.loading,
        loggedIn: state.LoginReducer.userInfo
    }),
    null
)(PrivateRoute)

export default withRouter(connectedPrivateRoute)
