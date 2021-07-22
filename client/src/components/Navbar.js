import { React, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import { Nav, Navbar, Button, NavDropdown } from 'react-bootstrap';
import { useHistory } from "react-router-dom";
import { useMediaQuery } from 'react-responsive';

import ClubList from './ClubList';

import '../style/Navbar.css';

function Navigationbar() {
  const history = useHistory();
  const isTabletOrMobile = useMediaQuery({ query: '(max-width: 1224px)' });
  const [isShown, setIsShown] = useState(false);
  // onMouseEnter={() => setIsShown(true)}
  // onMouseLeave={() => setIsShown(false)}

  const delay = () => {
    setTimeout(() => {
      setIsShown(false);
    }, 2000);
  }

  return (
    <div className="Navbar">
      <Navbar id="navbar" sticky="top"
      expand="lg">
        <Navbar.Brand id="navbar-brand" href="/">
          명지대 총동아리연합회
        </Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse>
          <Nav className="mr-auto"> 
            {!isTabletOrMobile && 
              <>
                <Nav.Link id="nav-link" href="mju_club">총동연</Nav.Link>
                <Nav.Link id="nav-link" 
                  onMouseEnter={() => setIsShown(true)}
                  onMouseLeave={() => setIsShown(false)}>동아리</Nav.Link>
                <Nav.Link id="nav-link" href="promotion">청원게시판</Nav.Link>
                <Nav.Link id="nav-link" href="about">키움 이모저모</Nav.Link>
                <Nav.Link id="nav-link" href="monthly_keyum">Montly-Key:um</Nav.Link>
              </>
            }
            {isTabletOrMobile && 
              <>
                <Nav.Link id="nav-link" href="mju_club" style={{textAlign: "center"}}>총동연</Nav.Link>
                <Nav.Link id="nav-link" style={{textAlign: "center"}}
                onMouseEnter={() => setIsShown(true)}
                onMouseLeave={() => setIsShown(false)} >동아리</Nav.Link>
                {isShown && isTabletOrMobile &&
                  <div class="d-block nav">
                    <Nav>
                      <Nav.Link id="nav-link" href="mju_club" style={{textAlign: "center"}}>학술분과</Nav.Link>
                      <Nav.Link id="nav-link" href="mju_club" style={{textAlign: "center"}}>사회연구분과</Nav.Link>
                    </Nav>
                  </div>
                }
                <Nav.Link id="nav-link" href="promotion" style={{textAlign: "center"}}>청원게시판</Nav.Link>
                <Nav.Link id="nav-link" href="about" style={{textAlign: "center"}}>키움 이모저모</Nav.Link>
                <Nav.Link id="nav-link" href="monthly_keyum" style={{textAlign: "center"}}>Montly-Key:um</Nav.Link>
              </>
            }
            
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
      {isShown && !isTabletOrMobile &&
        <Navbar id="navbar" sticky="top"
        expand="lg">
          <ClubList/>
        </Navbar>
      }
    </div>
  );
}

export default Navigationbar;
