import React from 'react'
import {Switch, Route, Redirect} from 'react-router-dom'
import RouteWithLayout from '../Components/CustomRouteComponents/RouteWithLayout'


const itemRoute = ({match}) => {
    console.log(match)
    const tempComp = random(match.params.id)
    return (
        tempComp
    )
}

const random = (nr) => {
    return(
       <div>Hello {nr}</div>
    )
}

export default itemRoute
