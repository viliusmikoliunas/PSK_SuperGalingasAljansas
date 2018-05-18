import React from 'react'
import PropTypes from 'prop-types'
import {Button, Modal, ModalHeader, ModalBody, ModalFooter} from 'reactstrap'
import ReactStars from 'react-stars'


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
        const {username, date, items, ammount, paymentDate, review, confirm} = this.props
        let key = 0
        const itemListElement = 
        <div>
            {items.map(item => {
                return (
                    <p key={key++}>{item.Title + '(' + item.Quantity + ')'}</p>
                )
            })}
        </div>
    
        const reviewElement = 
            <div>
                <Button color="info" onClick={this.toggle}>CheckReview</Button>

                <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
                <ModalHeader toggle={this.toggle}>{username} review</ModalHeader>
                <ModalBody>
                    <ReactStars
                        count={5}
                        value={review.Stars}
                        edit={false}
                        size={24}
                        color2={'#ffd700'} 
                    /><br/>
                    {review.Description}
                </ModalBody>
                <ModalFooter>
                    <Button color="secondary" onClick={this.toggle}>Close</Button>
                </ModalFooter>
                </Modal>
            </div>
    
        const confirmElement = confirm
            ? 'This order is confirmed'
            : <Button color="success">Confirm order</Button>
        
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
