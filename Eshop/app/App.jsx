import { hot } from 'react-hot-loader';
import React from 'react';
import { render } from 'react-dom';
import { Route, Router, browserHistory } from 'react-router';
import './styles.css';

import MainLayout from './MainLayout';
import LoginPage from './LoginPage';

const App = () => (
	<Router key={Math.random()} history={browserHistory}>
        <Route path="/" component={MainLayout}>
            
        </Route>
        <Route path="/login" component={LoginPage} />
	</Router>
);

export default hot(module)(App);
