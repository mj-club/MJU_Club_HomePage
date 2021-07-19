import React from "react"
import { Container, Col, Row} from 'react-bootstrap';
import "../style/RightTitle.css";
const RightTitle = ({title, menu1, menu2, menu3}) => {
  return (
    <>
    <Container className="RightTitle">
      <Row >
        <Col className="mb-0" xs="4"><h2>{title}</h2></Col>
        <Col className="mb-0 right-title">{menu1}{'>'}{menu2}{'>'}{menu3}</Col>
      </Row>      
    </Container>
    </>
  );
}

export default RightTitle;