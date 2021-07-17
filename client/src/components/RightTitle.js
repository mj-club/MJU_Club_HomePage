import React from "react"
import { Container, Col, Row} from 'react-bootstrap';
import "../style/RightTitle.css";
const RightTitle = ({title, menu1, menu2, menu3}) => {
  return (
    <>
    <Container className="pagenation">
      <Row >
        <Col className="mb-0" xs="3"><h1>{title}</h1></Col>
        <Col className="mb-0 left-title">{menu1}{'>'}{menu2}{'>'}{menu3}</Col>
      </Row>      
    </Container>
    </>
  );
}

export default RightTitle;