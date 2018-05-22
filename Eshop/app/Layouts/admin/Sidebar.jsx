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
      <SidebarLink to='/admin/orders'>Orders</SidebarLink>
      <SidebarLink to='/admin/create-item'>Create Item</SidebarLink>
    </div>
    : null

  const userRoutes = userRole === 'User'
    ?
    <div>
    </div>
    : null

  const nonAdminRoutes = userRole !== 'Admin'
  ? <div>
      <SidebarLink to='/user/shopping-cart'>Shopping Cart</SidebarLink>
    </div>
  : null

  return (
    <div id="sidebar">
      <ul>
        {adminRoutes}
        {nonAdminRoutes}
        {userRoutes}
      </ul>
    </div>
  )
}


export default Sidebar
