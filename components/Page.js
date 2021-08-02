import React from "react"
import { Container, Row, Col } from 'react-bootstrap';

import Navbar from "./Navbar";
import ImageExampleFluid from "./ImageExampleFluid";
import {
  BrowserView,
  MobileView,
  isBrowser,
  isMobile
} from "react-device-detect";
import Footer from "./Footer/Footer";

const Page = ({ rightTitle, rightInner, rightmenu, rightPagination }) => {
  return (
    <>
      <style>
        {
          `
        .item {
          font-family: "twayair";
        }
        `
        }
      </style>
      <Navbar />
      <Container>
        <Row>
          {isBrowser ? <ImageExampleFluid /> : null}
        </Row>
        <br></br>
        {isBrowser ? console.log("borwser") : console.log("mobile")}
        {isBrowser ?
          // browser
          
          <Row>
            <Col className="item" xs="1">
              {rightmenu} 
              {/* 원하는메뉴를 각 페이지별로 임포트 하셔서 사용하시면 됩니다! */}
            </Col>
            <Col className="item" xs="11">
              {rightTitle}
              <br/>
              {rightInner}
            </Col>
          </Row> :
          // mobile
          <Row>
            <Col className="item" style="font-famiily: 'twayair'">
              {rightInner}
            </Col>
          </Row>}
          <br/>
          <Row>
            <Col xs="4"/>
            <Col className="item" xs="4">
              {rightPagination}
            </Col>
          </Row>
      </Container>
      <br/>
      <Footer />
    </>
  );
}

export default Page;