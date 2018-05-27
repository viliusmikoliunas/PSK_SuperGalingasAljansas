import React, {Component} from 'react'
import { bindActionCreators } from 'redux'
import {connect} from 'react-redux'
import {Redirect, Route, withRouter} from 'react-router-dom'
import RouteWithLayout from './RouteWithLayout'
import {getUserRoleFromToken} from '../../FunctionalComponents/jwt/parseJwt'


class PrivateRoute extends Component {

    checkPrivilege(userRole, approvedRolesForThisPath){
        const uppercaseRoles = approvedRolesForThisPath.map(title => title.toUpperCase())
        const currentRole = userRole.toUpperCase()
        return (uppercaseRoles.indexOf(currentRole) > -1)
    }

    render(){
        const { component: Component, roles: permisedRoles, layout, ...rest } = this.props

        const currentRole = getUserRoleFromToken()

        const canUserAccessThisRoute = 
            currentRole && this.checkPrivilege(currentRole, permisedRoles)
        
        //if user has no role he is redirected to login page
        //else means user doesn't have permission to access resource, thus he is redirected to back to main page
        const redirectPath = currentRole == null
            ? '/login' : '/'

        return (
            <Route {...rest} render={(props) => (
                this.props.loggingIn
                ? null
                : 
                ( canUserAccessThisRoute
                    ?   (layout === undefined
                            ? <Route component={Component} {...props}/> 
                            : <RouteWithLayout layout={layout} component={Component} {...props}/>
                        )
                    :   <Redirect to={{
                        pathname: redirectPath,
                        state: { from: props.location }}}
                        />
                )
            )} />
        )
    }   
}

const connectedPrivateRoute = connect(
    (state) => ({
        loggingIn: state.LoginReducer.loggingIn
    }),
    null
)(PrivateRoute)

export default withRouter(connectedPrivateRoute)
