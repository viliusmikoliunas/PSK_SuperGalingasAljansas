﻿import React, { Component } from 'react';
import { withRouter } from 'react-router'

import LoginForm from './Forms/LoginForm/LoginForm';

export default class extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <LoginForm/>
        );
    }
}