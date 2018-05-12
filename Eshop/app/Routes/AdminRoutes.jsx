import React from 'react'
import {Switch} from 'react-router-dom'
import AdminLayout from '../Layouts/adminLayout/Layout'
import MainContentLayout from './Main Content Layout/MainContentLayout'
import PrivateRoute from '../Components/CustomRouteComponents/PrivateRoute'

const AdminRoleRoute = ({...rest}) => 
    <PrivateRoute roles={["Admin"]} layout={AdminLayout} {...rest}/>

const sitesRoute = () => {
    return (
        <MainContentLayout
            title='User list'
            mainTable={<AddNewSiteForm parameters={addNewSiteFormParameters} />}
        />
    )
}

const adminRoute = ({match}) => {
    return (
        //order matters! last element (in this case <switch>/reports) acts as index redirect
        <Switch>
            <AdminRoleRoute exact path={`${match.path}/user-list`} component={sitesRoute} />
        </Switch>
    )
}

export default adminRoute