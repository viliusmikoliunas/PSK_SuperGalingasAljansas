import React from 'react'
import PropTypes from 'prop-types'
import {Button, Modal, ModalHeader, ModalBody, ModalFooter} from 'reactstrap'
import ReactStars from 'react-stars'
import toFixed from '../../FunctionalComponents/formatting/toFixed'


class ShoppingHistoryCard extends React.Component {

    render(){
        /*
        const itemListElement = 
        <div>
            {items.map(item => {
                return (
                    <p key={key++}>{item.title + ' (' + item.quantity + ')'}</p>
                )
            })}
        </div>*/

        return (
            <tr>
                <td>Data</td>
                <td>Prekes</td>
                <td>Kaina</td>
            </tr>
        )
    }
}

export default ShoppingHistoryCard
