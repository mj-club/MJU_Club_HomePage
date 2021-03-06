import { React, useState } from 'react';
import { Nav, Navbar, Button, NavDropdown } from 'react-bootstrap';
import { useHistory } from "react-router-dom";
import { useMediaQuery } from "react-responsive";

import ClubList from "./ClubList";



function Navigationbar() {
  const history = useHistory();
  const isTabletOrMobile = useMediaQuery({ query: "(max-width: 1224px)" });
  const [isShown, setIsShown] = useState(false);
  // onMouseEnter={() => setIsShown(true)}
  // onMouseLeave={() => setIsShown(false)}

  const delay = () => {
    setTimeout(() => {
      setIsShown(false);
    }, 2000);
  };

  return (
    <>
    <style>
      {
        `
        @font-face {
          font-family: 'twayair';
          src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_tway@1.0/twayair.woff') format('woff');
          font-weight: normal;
          font-style: normal;
      }
      
      #navbar {
          background-color: #1f67bf7c;
          color: #000;
          opacity: 100%;
      }
      
      #navbar-brand{
          color: #0C0047;
          /* font-weight: bold; */
          font-size: 25px;
          font-family: 'twayair';
      }
      
      .mr-auto{
          margin: 0 auto;
      }
      
      #nav-link{
          /* font-weight: bold; */
          color: #000;
          margin: 0 auto;
          margin-left: 50px;
          margin-right: 50px;
          font-size: 20px;
          font-family: 'twayair';
      }
      
      #nav-link:hover{
          color : rgb(87, 107, 216);
          border-radius: 4px;
      }
      .d-block .nav {
          text-align: center;
          justify-content: center;
          align-items: center;
      }
      #nav-link-mobile {
          font-size: 16px;
          font-family: "twayair";
          color: rgb(78, 78, 78);
      }
      #btn {
          justify-content: center;
          text-align: center;
          margin: 0 30 0 30;
      }
      
      #signup-btn{
          background-color: #76a5fd;
          color: #000;
          justify-content: center;
          border: none;
          /* font-weight: bold; */
          margin-right: 5px;
          margin-left: 5px;
          font-family: 'twayair';
      }
      
      #signup-btn:hover{
          background-color:  #add3ff;
      }
        `
      }
    </style>
    <div className="Navbar">
      <Navbar id="navbar" sticky="top" expand="lg">
        <Navbar.Brand id="navbar-brand" href="/">
          ????????? ?????????????????????
        </Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse>
          <Nav className="mr-auto">
            {!isTabletOrMobile && (
              <>
                <Nav.Link id="nav-link" href="about">
                  ?????????
                </Nav.Link>
                <Nav.Link
                  id="nav-link"
                  onMouseEnter={() => setIsShown(true)}
                  onMouseLeave={() => delay()}
                >
                  ?????????
                </Nav.Link>
                <Nav.Link id="nav-link" href="promotion">
                  ???????????????
                </Nav.Link>
                <Nav.Link id="nav-link" href="about_keyum">
                  ?????? ????????????
                </Nav.Link>
                <Nav.Link id="nav-link" href="monthly_keyum">
                  Montly-Key:um
                </Nav.Link>
              </>
            )}
            {isTabletOrMobile && (
              <>
                <Nav.Link
                  id="nav-link"
                  href="mju_club"
                  style={{ textAlign: "center" }}
                >
                  ?????????
                </Nav.Link>
                <Nav.Link
                  id="nav-link"
                  style={{ textAlign: "center" }}
                  onMouseEnter={() => setIsShown(true)}
                  onMouseLeave={() => setIsShown(false)}
                >
                  ?????????
                </Nav.Link>
                {isShown && isTabletOrMobile && (
                  <div className="d-block nav">
                    <Nav>
                      <Nav.Link
                        id="nav-link-mobile"
                        href="mju_club"
                        style={{ textAlign: "center" }}
                      >
                        ????????????
                      </Nav.Link>
                      <Nav.Link
                        id="nav-link-mobile"
                        href="mju_club"
                        style={{ textAlign: "center" }}
                      >
                        ??????????????????
                      </Nav.Link>
                      <Nav.Link
                        id="nav-link-mobile"
                        href="mju_club"
                        style={{ textAlign: "center" }}
                      >
                        ??????????????????
                      </Nav.Link>
                      <Nav.Link
                        id="nav-link-mobile"
                        href="mju_club"
                        style={{ textAlign: "center" }}
                      >
                        ????????????
                      </Nav.Link>
                      <Nav.Link
                        id="nav-link-mobile"
                        href="mju_club"
                        style={{ textAlign: "center" }}
                      >
                        ??????????????????
                      </Nav.Link>
                      <Nav.Link
                        id="nav-link-mobile"
                        href="mju_club"
                        style={{ textAlign: "center" }}
                      >
                        ????????????
                      </Nav.Link>
                      <Nav.Link
                        id="nav-link-mobile"
                        href="mju_club"
                        style={{ textAlign: "center" }}
                      >
                        ????????????
                      </Nav.Link>
                    </Nav>
                  </div>
                )}
                <Nav.Link
                  id="nav-link"
                  href="promotion"
                  style={{ textAlign: "center" }}
                >
                  ???????????????
                </Nav.Link>
                <Nav.Link
                  id="nav-link"
                  href="about"
                  style={{ textAlign: "center" }}
                >
                  ?????? ????????????
                </Nav.Link>
                <Nav.Link
                  id="nav-link"
                  href="monthly_keyum"
                  style={{ textAlign: "center" }}
                >
                  Montly-Key:um
                </Nav.Link>
              </>
            )}
          </Nav>
          <div id="btn">
            <Button
              id="signup-btn"
              as="input"
              type="button"
              value="?????????"
              onClick={() => {
                history.push("/login");
              }}
            />
            <Button
              id="signup-btn"
              as="input"
              type="button"
              value="????????????"
              onClick={() => {
                history.push("/join");
              }}
            />
          </div>
        </Navbar.Collapse>
      </Navbar>
      {isShown && !isTabletOrMobile && (
        <Navbar id="navbar" sticky="top" expand="lg">
          <ClubList />
        </Navbar>
      )}
    </div>
    </>
  );
}

export default Navigationbar;
