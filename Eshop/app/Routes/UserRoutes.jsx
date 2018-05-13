import React from 'react'
import {Switch, Route, Redirect} from 'react-router-dom'
import AdminLayout from '../Layouts/admin/Layout'
import PrivateRoute from '../Components/CustomRouteComponents/PrivateRoute'
import shoppingCartTable from '../Components/ShoppingCartTable/ShoppingCartTable'


const UserRoleRoute = ({...rest}) => 
    <PrivateRoute roles={["User"]} layout={AdminLayout} {...rest}/>

const userRoute = ({match}) => {
    return (
        <Switch>
            <UserRoleRoute exact path={`${match.path}/shopping-cart`} component={shoppingCartTable} />
            <Route exact path={`${match.path}/`} render={() => <Redirect to={`${match.path}/shopping-cart`}/>}/>
        </Switch>
    )
}

export default userRoute
