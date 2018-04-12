import React, { Component } from 'react';
import { withRouter } from 'react-router'

export default class extends Component {
    constructor(props) {
        super(props);
        this.props.router.push('/login');
    }

    render() {
        return (
            <h1>Login placeholder</h1>
        );
    }
}