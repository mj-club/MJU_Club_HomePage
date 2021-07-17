import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import LoginPage from '../pages/LoginPage';
import JoinPage from '../pages/JoinPage';
import MainPage from '../pages/MainPage';
import FindIdPwPage from '../pages/FindIdPwPage';
import ClubsPage from '../pages/ClubsPage';
import MjuClubPage from '../pages/MjuClubPage';
import PromotionPage from '../pages/PromotionPage';
import AboutPage from '../pages/AboutPage';
import MonthlyPage from '../pages/MonthlyPage';

// Pages 로 이동
export default function Routers() {
  return(
    <Router>
      <>
        <Switch>
          {/* navbar menu route*/}
          <Route path="/clubs" component={ClubsPage}/>
          <Route path="/mju_club" component={MjuClubPage}/>
          <Route path="/promotion" component={PromotionPage}/>
          <Route path="/about" component={AboutPage}/>
          <Route path="/monthly_keyum" component={MonthlyPage}/>

          <Route path="/login" component={LoginPage}/>
          <Route path="/join" component={JoinPage}/>
          <Route path="/find_id_pw" component={FindIdPwPage}/>

          <Route path="/">
            <MainPage />
          </Route>
        </Switch>
      </>
    </Router>
  );
}