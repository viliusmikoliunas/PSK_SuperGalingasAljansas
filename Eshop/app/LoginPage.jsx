﻿import React, { Component } from 'react';

import LoginForm from './LoginForm/LoginForm';

export default class LoginPage extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <LoginForm/>
        );
    }
}
