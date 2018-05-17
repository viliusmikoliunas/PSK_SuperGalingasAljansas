import React from 'react'
import PropTypes from 'prop-types'
import {Button} from 'reactstrap'


const Order = (props) => {
    const {username, date, items, ammount, paymentDate, review, confirm} = props
    let key = 0
    const itemListElement = 
    <div>
        {items.map(item => {
            return (
                <p key={key++}>{item.Title + '(' + item.Quantity + ')'}</p>
            )
        })}
    </div>

    const reviewElement = "reviewlink"

    const confirmElement = confirm
        ? 'This order is confirmed'
        : <Button>Confirm order</Button>
    
    return (
        <tr>
            <td>{username}</td>
            <td>{date}</td>
            <td>{itemListElement}</td>
            <td>{ammount}</td>
            <td>{paymentDate}</td>
            <td>{reviewElement}</td>
            <td>{confirmElement}</td>
        </tr>
    )
}

export default Order

Order.propTypes = {
    username: PropTypes.string,
    date: PropTypes.string,
    items: PropTypes.arrayOf(
        PropTypes.shape({
            Title: PropTypes.string,
            Quantity: PropTypes.number
        })
    ),
    ammount: PropTypes.number,
    paymentDate: PropTypes.string,
    review: PropTypes.shape({
        Stars: PropTypes.number,
        Description: PropTypes.string
    }),
    confirmed: PropTypes.bool
}
