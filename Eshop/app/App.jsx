import { hot } from 'react-hot-loader';
import React from 'react';
import { render } from 'react-dom';
import { Route, Router } from 'react-router';
import './styles.css';

import MainLayout from './MainLayout';
import LoginPage from './LoginPage';
import MainPage from './MainPage/MainPage';

import { history } from './store';

const App = () => (
	<Router key={Math.random()} history={history}>
                <Route path="/" component={MainLayout}>
                        <Route path="/cart" component={MainPage}/>
                </Route>
                <Route path="/login" component={LoginPage} />
	</Router>
);

export default hot(module)(App);
