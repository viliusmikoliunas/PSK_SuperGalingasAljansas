import { hot } from 'react-hot-loader';
import React from 'react';
import { render } from 'react-dom';
import { Route, Router, browserHistory } from 'react-router';

import Navbar from './LayoutComponents/Navbar';

const App = () => (
	<Router key={Math.random()} history={browserHistory}>
        <Route path="/" component={Navbar}/>
	</Router>
);

const TempComponent = () => {
    return(<h1>Hello there</h1>);
}

export default hot(module)(App);
