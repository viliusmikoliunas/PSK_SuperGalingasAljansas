import React from 'react'
import {Link} from 'react-router-dom'
import history from '../../../Redux/history'
import './ItemRowStyles.css'

export default class ItemRow extends React.Component {

    render(){
        const {id, title, cost, pictureLocation, itemCategories, itemTraits} = this.props
        let key = 0
        const categoryString = itemCategories.length > 0
            ? itemCategories.map(category => {
                return <p key={key++}>{category.title}</p>
            })
            : "<No categories>"
        
        const traitString = itemTraits.length > 0
            ? itemTraits.map(trait => {
                return <p key={key++}>{trait.title}</p>
            })
            : "<No properties>"

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
