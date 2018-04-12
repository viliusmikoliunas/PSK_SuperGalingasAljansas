import React, {Component} from 'react';

import Navbar from './LayoutComponents/Navbar';
import Sidebar from './LayoutComponents/Sidebar/Sidebar';

export default class extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { children } = this.props;
        return (
            <div className="MainLayout">
                <div className="Header">
                    <Navbar/>
                </div>
                <div className="SideBar">
                    <Sidebar/>
                </div>
                <div className="MainField">
                    {children}
                </div>
            </div>
        );
    }
}
