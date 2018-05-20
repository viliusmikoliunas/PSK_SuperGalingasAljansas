import React from 'react'
import {Link} from 'react-router-dom'
import history from '../../../Redux/history'
import './ItemRowStyles.css'

export default class ItemRow extends React.Component {

    render(){
        const {id, title, cost, pictureLocation, itemCategories, itemTraits} = this.props

        const categoryString = itemCategories != null
            ? itemCategories.map(category => {
                return (category + "\r\n")
            })
            : "<No categories>"
        
        const traitString = itemTraits != null
            ? itemTraits.map(trait => {
                return (trait + "\r\n")
            })
            : "<No traits>"

        return(
            <tr className="itemRow" onClick={() => history.push(/item/ + id )}>
                <td scope="row">
                    <img src={pictureLocation}/>
                </td>
                <td>{title}</td>
                <td>{cost}</td>
                <td>{categoryString}</td>
                <td>{traitString}</td>
            </tr>
        )
    }
}
