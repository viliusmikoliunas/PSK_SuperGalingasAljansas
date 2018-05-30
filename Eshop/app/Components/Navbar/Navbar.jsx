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
import {getUsernameFromToken, getUserRoleFromToken} from '../../FunctionalComponents/jwt/parseJwt'
import {logout} from '../../Redux/actions/LoginActions'
import loadCartFromDb, {loadShoppingCartFromLocalStorage} from '../../Redux/actions/ShoppingCartActions'
import './NavbarStyles.css'


class Navbar extends Component {
    constructor(props) {
        super(props);

        this.toggle = this.toggle.bind(this);
        this.state = {
            isOpen: false
        };
    }

    componentDidMount(){
        const {loggedIn, dispatchLoadCartFromDb, dispatchLoadCartFromLocalStorage} = this.props
        if (loggedIn){
            dispatchLoadCartFromDb()
        }
        else {
            dispatchLoadCartFromLocalStorage()
        }
    }

    toggle() {
        this.setState({
            isOpen: !this.state.isOpen
        });
    }
    render() {
        const userRole = getUserRoleFromToken()
        const userElement = this.props.loggedIn && localStorage['jwtToken'] != null
            ?   <Nav>
                    <NavItem>
                        <Link to={'/' + userRole.toLowerCase()}>Welcome {getUsernameFromToken()}</Link>
                    </NavItem>
                    <NavItem>
                        <Button color="warning" onClick={() => this.props.dispatchLogout()}>Logout</Button>
                    </NavItem>
                </Nav>
            :   <NavItem><Button color="warning" tag={Link} to='/login'>Login</Button></NavItem>


        let itemCount = 0
        this.props.cartItemList.map(item => {
            itemCount += item.quantity
        })
        if (userRole === 'Admin')
            localStorage.removeItem('shoppingCart')

        const shoppingCartElement = userRole !== 'Admin' //({itemCount})
        ?   <NavItem>
                <Link to={'/user/shopping-cart'}>Shopping cart</Link>
            </NavItem> 
        : null

        return (
            <div>
                <ReactstrapNavBar color="primary" light expand="md" className="navigationBar header">
                    <NavbarBrand tag={Link} to='/'>Super Galingas Shop'as</NavbarBrand>
                    <NavbarToggler onClick={this.toggle} />
                    <Collapse isOpen={this.state.isOpen} navbar>
                        <Nav className="ml-auto" navbar>
                            {shoppingCartElement}
                            {userElement}
                        </Nav>
                    </Collapse>
                </ReactstrapNavBar>
            </div>
        );
    }
}

export default connect(
    (state) => ({
        loggedIn: state.LoginReducer.loggedIn,
        cartItemList: state.ShoppingCartReducer.shoppingCart
    }),
    (dispatch) => bindActionCreators({
        dispatchLoadCartFromDb: loadCartFromDb,
        dispatchLoadCartFromLocalStorage: loadShoppingCartFromLocalStorage,
        dispatchLogout: logout
    }
    ,dispatch)
)(Navbar)
