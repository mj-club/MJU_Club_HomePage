import React from 'react';
import './App.css';
import Navbar from './components/Navbar/Navbar';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
// import Home from './pages';
import About from './pages/about';
// import logo from './logo.svg';
import Login from './routes/Login';
import Home from './routes/Home';

import {
  BrowserView,
  MobileView,
  // isBrowser,
  // isMobile
} from "react-device-detect";

function App() {
  return (
    <Router>
      <Route path="/" exact={true} component={Home} />
      <Route path="/login" component={Login} />
    </Router>
    
//     <Router>
//       <Navbar />
//       <Switch>
//         <Route path='/' exact component={Home} />
//         <Route path='/about' exact component={About} />
//       </Switch>
//     </Router>
  );
}

export default App;
