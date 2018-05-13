import React from 'react'
import SidebarLink from './SidebarLink'
import './sidebar.css'


const Sidebar = (props) => {
  const adminRoutes = 
    <ul>
      <SidebarLink to='/' matchexactpathforactive={1}>Main Page</SidebarLink>
      <SidebarLink to='/admin/user-list'>User List</SidebarLink>
    </ul>

  return (
    <div id="sidebar">
      {adminRoutes}
    </div>
  )
}

export default Sidebar
