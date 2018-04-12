import { hot } from 'react-hot-loader';
import React from 'react';
import { render } from 'react-dom';
import { Route, Router, browserHistory } from 'react-router';
import './styles.css';

import MainLayout from './WebPages/MainLayout';
import LoginPage from './WebPages/LoginPage';

const App = () => (
	<Router key={Math.random()} history={browserHistory}>
        <Route path="/" component={MainLayout}>
            <Route path="/login" component={LoginPage} />
        </Route>
	</Router>
);

export default hot(module)(App);
