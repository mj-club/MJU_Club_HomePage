import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import About from '../routes/About';
import Login from '../routes/Login';
import Home from '../routes/Home';

// Components/Routes.js 로 이동
export default () => (
    <>
    <Router>
      <Route path="/" exact={true} component={Home} />
      <Route path="/about" component={About} />
      <Route path="/login" component={Login} />
    </Router>
  </>
);
