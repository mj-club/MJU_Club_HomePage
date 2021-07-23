import React from "react"
import { Container, Row, Col } from 'react-bootstrap';

import Navbar from "./Navbar";
import ImageExampleFluid from "./ImageExampleFluid";
import SubMenu from "./Submenu";
import {
  BrowserView,
  MobileView,
  isBrowser,
  isMobile
} from "react-device-detect";

const Page = ({ rightTitle, rightInner}) => {
  return (
    <>
      <Navbar />
      <Container>
        <Row>
          {isBrowser ? <ImageExampleFluid /> : null}
        </Row>
        {isBrowser ? console.log("borwser") : console.log("mobile")}
        {isBrowser ?
          // browser
          <Row>
            <Col className="item" xs="3">
              <SubMenu />
            </Col>
            <Col className="item" xs="9">
              {rightTitle}
              {rightInner}
            </Col>
          </Row> :
          // mobile
          <Row>
            <Col className="item" style="font-famiily: 'twayair'"> 
              {rightInner}
            </Col>
          </Row>}
      </Container>
    </>
  );
}

export default Page;