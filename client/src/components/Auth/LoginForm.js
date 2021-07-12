import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircle, faUnlockAlt, faUser, faKey } from "@fortawesome/free-solid-svg-icons";
import { Button, InputGroup, FormControl, Form, Container, Col, Row, Card } from 'react-bootstrap';

function LoginForm() {
  return (
    <>
      <style type="text/css">
        {`
        .body{
          border : 3px solid #F1C40F;
          margin : 30px;
          padding : 30px;
          text-align: center;
        }
        
        .form-title {
          font: 2em bold;
          margin-bottom : 20px;
        }
        
        .card-link{
          color : black;
        }

        #join{
          float:left;
          text-align: start;
        }
  
        #find {
          float:right;
        }

    `}
      </style>

      <Card className="body">
        <Container >
          <Row className="justify-content-md-center">
            <Col xs={12} md={6}>
              <div className="fa-layers">
                <FontAwesomeIcon icon={faCircle} color="#F1C40F" size="5x" transform="up-8 left-5" />
                <FontAwesomeIcon icon={faUnlockAlt} inverse size="5x" transform="shrink-6 up-8 left-4" />
              </div>
              <div className="form-title">로그인</div>
              {/* 이메일로바꾸기 */}
              <Form className="login-form mb-3" >
                <Form.Group controlId="email">
                  <InputGroup className="mb-3">
                    <InputGroup.Prepend>
                      <InputGroup.Text className="addon">
                        <FontAwesomeIcon icon={faUser} color="gray" fixedWidth size="2x" transform="shrink-4" />
                      </InputGroup.Text>
                    </InputGroup.Prepend>
                    <FormControl
                      placeholder="이메일"
                    />
                  </InputGroup>
                </Form.Group>

                <Form.Group controlId="pw">
                  <InputGroup className="mb-3">
                    <InputGroup.Prepend>
                      <InputGroup.Text className="addon">
                        <FontAwesomeIcon icon={faKey} color="gray" fixedWidth size="2x" transform="shrink-4" />
                      </InputGroup.Text>
                    </InputGroup.Prepend>
                    <FormControl
                      placeholder="비밀번호"
                    />
                  </InputGroup>
                </Form.Group>

                <div className="d-grid gap-2">
                  <Button variant="warning" type="submit" size="lg">
                    로그인
                  </Button>
                  <Button variant="warning" size="lg">
                    카카오 로그인
                  </Button>
                </div>
              </Form>
              <Row>
                <Col>
                  <Card.Link href="#" id="join" >회원가입</Card.Link>
                </Col>
                <Col>
                  <Card.Link href="#" id="find">ID/PW찾기</Card.Link>
                </Col>
              </Row>
            </Col>
          </Row>
        </Container>
      </Card >
    </>
  );
}

export default LoginForm;