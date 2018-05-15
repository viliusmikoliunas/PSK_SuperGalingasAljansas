import React from 'react';
import './ItemRowStyles.css';

export default class ItemRow extends React.Component {

    render(){
        const {title, cost, pictureLocation, itemCategories, itemTraits} = this.props;
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
            <tr className="itemRow">
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
