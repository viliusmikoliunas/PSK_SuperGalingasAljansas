import React from 'react'
import {Switch, Route, Redirect} from 'react-router-dom'
import ItemViewLayout from '../Layouts/ItemViewLayout'
import RouteWithLayout from '../Components/CustomRouteComponents/RouteWithLayout'
import parseUrlParams from '../FunctionalComponents/parsing/parseUrlQueryParameters'


const itemRoute = ({match}) => {

    return (
        <ItemViewLayout itemId={match.params.id}/>
    )
}

export default itemRoute
