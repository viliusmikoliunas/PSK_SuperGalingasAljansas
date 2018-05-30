import React from 'react'
import {Switch, Route, Redirect} from 'react-router-dom'
import AdminLayout from '../Layouts/admin/Layout'
import PrivateRoute from '../Components/CustomRouteComponents/PrivateRoute'
import RouteWithLayout from '../Components/CustomRouteComponents/RouteWithLayout'
import shoppingCartTable from '../Components/ShoppingCartTable/ShoppingCartTable'
import CheckoutPage from '../Layouts/CheckoutLayout'
import EditUserInfoForm from '../Layouts/EditUserInfoLayout'
import ChangePasswordForm from '../Components/ReduxForms/ChangePasswordForm/ChangePasswordForm'
import ShoppingHistoryTable from '../Components/ShoppingHistory/ShoppingHistoryTable'


const UserRoleRoute = ({...rest}) => 
    <PrivateRoute roles={["User"]} layout={AdminLayout} {...rest}/>

const userRoute = ({match}) => {
    return (
        <Switch>
            <PrivateRoute exact path ={`${match.path}/checkout`} roles={["User"]} component={CheckoutPage}/>
            <RouteWithLayout exact path={`${match.path}/shopping-cart`} layout={AdminLayout} component={shoppingCartTable} />
            <RouteWithLayout exact path={`${match.path}/edit-info`} layout={AdminLayout} component={EditUserInfoForm} />
            <RouteWithLayout exact path={`${match.path}/change-password`} layout={AdminLayout} component={ChangePasswordForm} />
            <RouteWithLayout exact path={`${match.path}/shopping-history`} layout={AdminLayout} component={ShoppingHistoryTable} />
            <Route exact path={`${match.path}/`} render={() => <Redirect to={`${match.path}/shopping-cart`}/>}/>
        </Switch>
    )
}

export default userRoute
