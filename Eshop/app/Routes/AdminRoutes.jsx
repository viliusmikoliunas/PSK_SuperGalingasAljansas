import React from 'react'
import {Switch, Route, Redirect} from 'react-router-dom'
import AdminLayout from '../Layouts/admin/Layout'
import PrivateRoute from '../Components/CustomRouteComponents/PrivateRoute'
import userTable from '../Components/UserTable/UserTable'
import OrderTable from '../Components/OrderTable/OrderTable'
import CreateItem from '../Layouts/CreateItemLayout'


const AdminRoleRoute = ({...rest}) => 
    <PrivateRoute roles={["Admin"]} layout={AdminLayout} {...rest}/>

const adminRoute = ({match}) => {
    return (
        <Switch>
            <AdminRoleRoute exact path={`${match.path}/user-list`} component={userTable} />
            <AdminRoleRoute exact path={`${match.path}/orders`} component={OrderTable} />
            <AdminRoleRoute exact path={`${match.path}/create-item`} component={CreateItem} />
            <Route exact path={`${match.path}/`} render={() => <Redirect to={`${match.path}/user-list`}/>}/>
        </Switch>
    )
}

export default adminRoute
