import React, {Component} from 'react'

import Navbar from '../Components/Navbar/Navbar'
import Sidebar from '../Components/Sidebar/Sidebar'


export default class MainLayout extends Component {
    
    render() {
        const { children } = this.props
        return (
            <div className="MainLayout">
                <div className="Header">
                    <Navbar/>
                </div>
                <div>
                    <Sidebar/>
                </div>
                <div className="MainField">
                    {children}
                </div>
            </div>
        )
    }
}
