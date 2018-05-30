import React from 'react'
import PropTypes from 'prop-types'
import {Button, Modal, ModalHeader, ModalBody, ModalFooter} from 'reactstrap'
import ReactStars from 'react-stars'
import toFixed from '../../FunctionalComponents/formatting/toFixed'


class ShoppingHistoryCard extends React.Component {

    render(){
        const {cost, date, items} = this.props

        const formattedDate = 
            date
                .replace('T', ' ')
                .substring(0, date.indexOf('.'))

        const itemListElement = 
        <div>
            {items.map(item => {
                return (
                    <p key={item.title}>{item.title + ' (' + item.quantity + ')'}</p>
                )
            })}
        </div>

        return (
            <tr>
                <td>{formattedDate}</td>
                <td>{itemListElement}</td>
                <td>{cost.toFixed(2)}</td>
            </tr>
        )
    }
}

export default ShoppingHistoryCard
