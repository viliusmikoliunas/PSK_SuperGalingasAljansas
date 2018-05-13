import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import { Nav, NavItem, NavLink } from 'reactstrap'
import './SidebarStyles.css'

export default class Sidebar extends Component {
    render() {
        return (
            <div>
                <p>List Based</p>
                <Nav vertical>
                    <NavItem>
                        <Link to='/admin'>Admin page</Link>
                    </NavItem>
                </Nav>
                <NavItem>
                    <Link to='/user'>User page</Link>
                </NavItem>
            </div>
        )
    }
}
/*
    <NavItem>
        <NavLink href="#">Link</NavLink>
    </NavItem>
    <NavItem>
        <NavLink href="#">Another Link</NavLink>
    </NavItem>
    <NavItem>
        <NavLink disabled href="#">Disabled Link</NavLink>
    </NavItem>
    <hr />
    <p>Link based</p>
    <Nav vertical>
        <NavLink href="#">Link</NavLink> <NavLink href="#">Link</NavLink> <NavLink href="#">Another Link</NavLink> <NavLink disabled href="#">Disabled Link</NavLink>
    </Nav>
*/