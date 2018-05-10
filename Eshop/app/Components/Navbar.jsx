import React, {Component} from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import {
    Collapse,
    Navbar as ReactstrapNavBar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink,
    Button
    } from 'reactstrap'
import {Link} from 'react-router-dom'
import parseJwt from '../FunctionalComponents/jwt/parseJwt'
import {logout} from '../Redux/actions/LoginActions'

class Navbar extends Component {
    constructor(props) {
        super(props);

        this.toggle = this.toggle.bind(this);
        this.state = {
            isOpen: false
        };
        this.userElement = localStorage['jwtToken']
            ?   <div>
                    <text>Welcome {(parseJwt(localStorage['jwtToken']))['sub']}</text>
                    <Button onClick={this.props.dispatchLogout}>Logout</Button>
                </div>
            :   <Button tag={Link} to='/login'>Login</Button>
    }
    toggle() {
        this.setState({
            isOpen: !this.state.isOpen
        });
    }
    render() {
        return (
            <div>
                <ReactstrapNavBar color="primary" light expand="md">
                    <NavbarBrand tag={Link} to='/'>Super Galingas Shop'as</NavbarBrand>
                    <NavbarToggler onClick={this.toggle} />
                    <Collapse isOpen={this.state.isOpen} navbar>
                        <Nav className="ml-auto" navbar>
                            <NavItem>
                                {this.userElement}
                            </NavItem>
                        </Nav>
                    </Collapse>
                </ReactstrapNavBar>
            </div>
        );
    }
}

export default connect(
    (state) => ({
        isLoggedIn: state.LoginReducer.loggedIn
    }),
    (dispatch) => bindActionCreators({
        dispatchLogout: logout
    }
    ,dispatch)
)(Navbar)
