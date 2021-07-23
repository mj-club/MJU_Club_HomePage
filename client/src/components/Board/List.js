import React from 'react';
import { Table, Row, Col, Button, Container } from 'react-bootstrap';
import { useHistory, useLocation } from "react-router-dom";

export default function List() {
  const history = useHistory();
  const location = useLocation();

  return(
    <>
      <Container className="RightTitle mt-3 mb-5" >
        <Table bordered hover>
          <thead>
            <tr>
              <th>글 번호</th>
              <th>제목</th>
              <th>작성자</th>
              <th>등록일</th>
              <th>조회수</th>
            </tr>
          </thead>
          <tbody>

            <tr>
              <td>1</td>
              <td>Mark</td>
              <td>Otto</td>
              <td>Otto</td>
              <td>@mdo</td>
            </tr>
            
          </tbody>
        </Table>
      </Container>
      <Row>
        <Col sm={10}/>
        <Col sm={2}>
          <Button onClick={() => {history.push(location.pathname+'/create')}}>
            글 작성하기
          </Button>
        </Col>
      </Row>
    </>
    
  );
}