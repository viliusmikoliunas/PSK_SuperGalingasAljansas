import React, {Component} from 'react';
import {
    Collapse,
    Navbar as ReactstrapNavBar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink
    } from 'reactstrap';
import {Link} from 'react-router';


export default class Navbar extends Component {
    constructor(props) {
        super(props);

        this.toggle = this.toggle.bind(this);
        this.state = {
            isOpen: false
        };
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
                                <NavLink tag={Link} to='/login'>Login</NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink tag={Link} to='/cart'>Shopping Cart</NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink tag={Link} to='/settings'>Settings</NavLink>
                            </NavItem>
                        </Nav>
                    </Collapse>
                </ReactstrapNavBar>
            </div>
        );
    }
}