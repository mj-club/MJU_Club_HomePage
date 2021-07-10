import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Navigationbar from './Navbar/Navbar';
import About from '../pages/about';
import Login from '../routes/Login';
import Home from '../routes/Home';

// Components/Routes.js 로 이동
export default () => (
    <Router>
        <Navigationbar />
        <Switch>
            <Route path="/" exact={true} component={Home} />
            <Route path="/login" component={Login} />
        </Switch>
    </Router>
)