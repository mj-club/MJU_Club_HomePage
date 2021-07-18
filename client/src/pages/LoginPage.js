import { React } from "react";
import { Container, Row, Col } from 'react-bootstrap';

import Navigationbar from '../components/Navbar';
import LoginForm from '../components/Auth/LoginForm';
import SubMenu from "../components/Submenu";
import ImageExampleFluid from "../components/ImageExampleFluid";
import RightTitle from "../components/RightTitle";

//반응형으로 만들기 
//Navigation 양끝이 안맞는데 css?인지 좀 고쳐야할듯

export default function LoginPage() {

  return(
    <>
      <Container>
        <Row>
          <Navigationbar />
        </Row>
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