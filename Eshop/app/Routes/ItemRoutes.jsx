import React from 'react'
import {Switch, Route, Redirect} from 'react-router-dom'
import ItemViewLayout from '../Layouts/ItemViewLayout'
import RouteWithLayout from '../Components/CustomRouteComponents/RouteWithLayout'


const itemRoute = ({match}) => {
    return (
        <ItemViewLayout/>
    )
}

const random = (nr) => {
    return(
       <div>Hello {nr}</div>
    )
}

export default itemRoute
