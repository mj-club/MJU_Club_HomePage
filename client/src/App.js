import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

import LoginPage from './pages/LoginPage';
import JoinPage from './pages/JoinPage';
import MainPage from './pages/MainPage';

function App() {
  return (
    <Router>
      <div className="app">
      <>
        <Switch>
          <Route path="/login" component={LoginPage}/>
          <Route path="/join" component={JoinPage}/>
          <Route path="/">
            <MainPage />
          </Route>
        </Switch>
      </>
      </div>
    </Router>
  );
}

export default App;
