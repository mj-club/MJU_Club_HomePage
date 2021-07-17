import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import { Nav, Navbar, Button } from 'react-bootstrap';
import '../style/Navbar.css';

function Navigationbar() {
    return (
      <div className="Navbar">
        <Navbar id="navbar" sticky="top"
        expand="lg">
          <Navbar.Brand id="navbar-brand">
            명지대 총동아리연합회
          </Navbar.Brand>
          <Navbar.Toggle />
          <Navbar.Collapse id="navbarScroll">
            <Nav
              className="mr-auto"
              style={{ maxHeight: '100px' }}
              navbarScroll
            > 
              <Nav.Link id="nav-link" href="about">총동연 소개</Nav.Link>
              <Nav.Link id="nav-link" href="clubs">동아리 소개</Nav.Link>
              <Nav.Link id="nav-link" href="promotion">청원게시판</Nav.Link>
              <Nav.Link id="nav-link" href="promotion">키움 이모저모</Nav.Link>
              <Nav.Link id="nav-link" href="place">Montly-KeyUm</Nav.Link>
            </Nav>
            <Button 
              id="signup-btn"
              as="input" 
              type="button" 
              value="로그인" />
            <Button 
              id="signup-btn"
              as="input" 
              type="button" 
              value="회원가입" />
          </Navbar.Collapse>
        </Navbar>
      </div>
    )
}

export default Navigationbar;