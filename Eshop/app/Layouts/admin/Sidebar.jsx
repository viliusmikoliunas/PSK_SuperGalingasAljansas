import React from 'react'
import SidebarLink from './SidebarLink'
import './sidebar.css'


const Sidebar = (props) => {
  const adminRoutes = 
    <div>
      <SidebarLink to='/admin/user-list'>User List</SidebarLink>
    </div>

  const userRoutes = 
    <div>
      <SidebarLink to='/user/shopping-cart'>Shopping Cart</SidebarLink>
    </div>

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
