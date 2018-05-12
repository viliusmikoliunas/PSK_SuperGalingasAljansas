import React from 'react'
import {Switch, Route, Redirect} from 'react-router-dom'
import AdminLayout from '../Layouts/admin/Layout'
import PrivateRoute from '../Components/CustomRouteComponents/PrivateRoute'
import userTable from '../Components/UserTable/UserTable'


const AdminRoleRoute = ({...rest}) => 
    <PrivateRoute roles={["Admin"]} layout={AdminLayout} {...rest}/>

const adminRoute = ({match}) => {
    return (
        <Switch>
            <AdminRoleRoute exact path={`${match.path}/user-list`} component={userTable} />
            <Route exact path={`${match.path}/`} render={() => <Redirect to={`${match.path}/user-list`}/>}/>
        </Switch>
    )
}

export default adminRoute
