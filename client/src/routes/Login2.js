import React from "react";
import LoginForm from '../components/Auth/LoginForm';
import Pagenation from "../components/Pagenation";
import SubMenu from "../components/Submenu";
import ImageExampleFluid from "../components/ImageExampleFluid";
import { Container, Row, Col } from 'react-bootstrap';
import RightTitle from "../components/RightTitle";

function Login() {
  return (
    <>
    {/* <Pagenation title={"로그인"} menu1={"HOME"} menu2={"마이페이지"} menu3={"프로필"}/> */}

    <Container>
      <Row>
        <ImageExampleFluid/>
      </Row>
      <Row>
        
        <Col className="item" md="3">
          <SubMenu />
        </Col>
        <Col className="item" md="1">
          
        </Col>
        <Col className="item" md="6">
          <RightTitle 
            title={"로그인"}
            menu1={"HOME"}
            menu2={"멤버십"}
            menu3={"로그인"}
          />
          <LoginForm />
        </Col>
        <Col className ="item" md = "2">
          
        </Col>
      </Row>
    </Container>
    </>
  );
}

export default Login;

