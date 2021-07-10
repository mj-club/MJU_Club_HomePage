import React from 'react';
import './App.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Navigationbar from './components/Navbar/Navbar';
import Routes from "./components/Router";

import {
  BrowserView,
  MobileView,
  // isBrowser,
  // isMobile
} from "react-device-detect";
import { Fragment } from 'react';

function App() {
  return (
    <Routes />
  );
}

export default App;
