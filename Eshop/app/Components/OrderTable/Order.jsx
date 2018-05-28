import React from 'react'
import PropTypes from 'prop-types'
import {Button, Modal, ModalHeader, ModalBody, ModalFooter} from 'reactstrap'
import ReactStars from 'react-stars'
import toFixed from '../../FunctionalComponents/formatting/toFixed'


class Order extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          modal: false
        };
    
        this.toggle = this.toggle.bind(this);
    }

    toggle() {
        this.setState({
        modal: !this.state.modal
        });
    }

    render(){
        const {id, username, date, items, cost, paymentDate, review, confirmed, onConfirm} = this.props
        let key = 0
        const itemListElement = 
        <div>
            {items.map(item => {
                return (
                    <p key={key++}>{item.title + ' (' + item.quantity + ')'}</p>
                )
            })}
        </div>
    
        const reviewElement = 
            review != null 
            ?
            <div>
                <Button color="info" onClick={this.toggle}>Check Review</Button>

                <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
                    <ModalHeader toggle={this.toggle}>{username} review</ModalHeader>
                    <ModalBody>
                        <ReactStars
                            count={5}
                            value={review.stars}
                            edit={false}
                            size={24}
                            color2={'#ffd700'} 
                        /><br/>
                        {review.description}
                    </ModalBody>
                    <ModalFooter>
                        <Button color="secondary" onClick={this.toggle}>Close</Button>
                    </ModalFooter>
                </Modal>
            </div>
            : 'User left no review'
    
        const confirmElement = confirmed
            ? 'This order is confirmed'
            : <Button color="success" onClick={() => onConfirm(id)}>Confirm Order</Button>
        
        
        const paymentElement = paymentDate != null
            ? <div>{paymentDate.replace('T', ' ')}</div>
            : 'Not paid yet'
        
        return (
            <tr>
                <td>{username}</td>
                <td>{date.replace('T', ' ')}</td>
                <td>{itemListElement}</td>
                <td>{cost.toFixed(2)}</td>
                <td>{paymentElement}</td>
                <td>{reviewElement}</td>
                <td>{confirmElement}</td>
            </tr>
        )
    }
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
