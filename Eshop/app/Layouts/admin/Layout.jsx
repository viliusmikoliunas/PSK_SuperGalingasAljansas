import React from 'react'
import AdminSidebar from './Sidebar'
import './layout.css'

export default class Layout extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const {children} = this.props;

    return (
        <div>
            <div className="header">
                
            </div>
    
            <div className="sidebar">
                <AdminSidebar />
            </div>
    
            <div className="content">
                {children}
            </div>
        </div>
    );
  }
}
