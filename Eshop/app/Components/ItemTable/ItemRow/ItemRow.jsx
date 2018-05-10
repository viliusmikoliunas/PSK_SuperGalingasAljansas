import React from 'react';
import './ItemRowStyles.css';

export default class ItemRow extends React.Component {
    constructor(props) {
        super(props);
    }
    
    render(){
        const {params} = this.props;
        return(
            <tr className="itemRow">
                <th scope="row">
                    <img src={params.ImagePath}/>
                </th>
                <td>{params.Title}</td>
                <td>{params.Categories.map(category => {
                    return (category + "\r\n")
                })}</td>
                <td>{params.Cost}</td>
                <td>{params.Traits.map(trait => {
                    return (trait + "\r\n")
                })}</td>
            </tr>
        )
    }
}
