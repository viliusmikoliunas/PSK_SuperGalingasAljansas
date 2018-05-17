import React from 'react'
import SidebarLink from './SidebarLink'
import './sidebar.css'

import {getUserRoleFromToken} from '../../FunctionalComponents/jwt/parseJwt'

const Sidebar = (props) => {
  const userRole = getUserRoleFromToken()

  const adminRoutes = userRole === 'Admin'
    ?
    <div>
      <SidebarLink to='/admin/user-list'>User List</SidebarLink>
    </div>
    : null

  const userRoutes = userRole === 'User'
    ?
    <div>
      <SidebarLink to='/user/shopping-cart'>Shopping Cart</SidebarLink>
    </div>
    : null

  return (
    <div id="sidebar">
      <ul>
        <SidebarLink to='/' matchexactpathforactive={1}>Main Page</SidebarLink>
        {adminRoutes}
        {userRoutes}
      </ul>
    </div>
  )
}


export default Sidebar
