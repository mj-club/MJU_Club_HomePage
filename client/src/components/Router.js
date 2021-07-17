import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import LoginPage from './pages/LoginPage';
import JoinPage from './pages/JoinPage';
import MainPage from './pages/MainPage';
import FindIdPwPage from './pages/FindIdPwPage';
import ClubsPage from './pages/ClubsPage';
import AboutPage from './pages/AboutPage';

// Pages 로 이동
export default function Routers() {
  return(
    <Router>
      <>
        <Switch>
          <Route path="/login" component={LoginPage}/>
          <Route path="/join" component={JoinPage}/>
          <Route path="/find_id_pw" component={FindIdPwPage}/>
          <Route path="/clubs" component={ClubsPage}/>
          <Route path="/about" component={AboutPage}/>
          <Route path="/">
            <MainPage />
          </Route>
        </Switch>
      </>
    </Router>
  );
}