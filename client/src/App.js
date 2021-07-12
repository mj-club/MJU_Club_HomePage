import React from 'react';
import './main.scss';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Routes from "./components/Router";
import 'bootstrap/dist/css/bootstrap.min.css';
import "./App.css";


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
