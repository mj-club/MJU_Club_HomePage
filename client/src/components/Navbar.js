import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import { Nav, Navbar, Button } from 'react-bootstrap';
import { useHistory } from "react-router-dom";

import '../style/Navbar.css';

function Navigationbar() {
  const history = useHistory();

  return (
    <div className="Navbar">
      <Navbar id="navbar" sticky="top"
      expand="lg">
        <Navbar.Brand id="navbar-brand" href="/">
          명지대 총동아리연합회
        </Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="mr-auto"
            style={{ maxHeight: '100px' }}
            navbarScroll
          > 
            <Nav.Link id="nav-link" href="mju_club">총동연</Nav.Link>
            <Nav.Link id="nav-link" href="clubs">동아리</Nav.Link>
            <Nav.Link id="nav-link" href="promotion">청원게시판</Nav.Link>
            <Nav.Link id="nav-link" href="about">키움 이모저모</Nav.Link>
            <Nav.Link id="nav-link" href="monthly_keyum">Montly-Key:um</Nav.Link>
          </Nav>
          <Button 
            id="signup-btn"
            as="input" 
            type="button" 
            value="로그인"
            onClick={() => {
              history.push("/login");
            }} />
          <Button 
            id="signup-btn"
            as="input" 
            type="button" 
            value="회원가입"
            onClick={() => {
              history.push("/join");
            }} />
        </Navbar.Collapse>
      </Navbar>
    </div>
  );
}

export default Navigationbar;
