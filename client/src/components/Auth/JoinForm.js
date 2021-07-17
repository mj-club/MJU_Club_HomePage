import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircle, faUnlockAlt } from "@fortawesome/free-solid-svg-icons";
import { Button, Table, InputGroup, FormControl, Form, Container, Col, Row, Card, FormGroup } from 'react-bootstrap';
import "../../style/JoinForm.css"


function JoinForm() {
  return (
    <>
      <style type="text/css">
        {`
        `}
      </style>

      <Card className="body pb-3">
        <Container >
          <Row className="justify-content-md-center">
            <Col xs={12} md={6}>
              <div className="top-icon" >
                <div className="fa-layers">
                  <FontAwesomeIcon icon={faCircle} color="#F1C40F" size="4x" transform="up-5 left-5" />
                  <FontAwesomeIcon icon={faUnlockAlt} inverse size="4x" transform="shrink-6 up-5 left-4" />
                </div>
              </div>

              <div className="content">
                <div className="form-title mt-3">회원가입</div>
                <Form>
                  {/* start of table1 */}
                  <div className="form-sub-title"><h5 className="fw-bold">아이디 정보</h5></div>
                  <Table className="text-start">
                    <tr>
                      <td>
                        <Form.Label className="m-0 p-1" >아이디</Form.Label>
                        <FormControl id="id" />
                        <Button id="valid-btn" variant="warning" className="p-1">중복확인</Button>
                      </td>
                      <td className="p-0 m-0"></td>
                    </tr>
                    <tr>
                      <td>
                        <Form.Label>비밀번호</Form.Label>
                        <FormControl id="pw" />
                      </td>
                      <td className="p-0 m-0"></td>
                    </tr>
                    <tr>
                      <td>
                        <Form.Label>비밀번호 확인</Form.Label>
                        <FormControl id="checkPw" />
                      </td>
                      <td className="p-0 m-0"></td>
                    </tr>
                  </Table>
                  {/* end of table1 */}

                  <div className="form-sub-title"><h5 className="fw-bold">개인 정보</h5></div>
                  <Table>
                    <tr>
                      <td>이름</td><td><FormControl id="id" /></td>
                      <td className="p-0"></td> {/*왜인지 모르지만 이 요상한 td를 하나 더 넣어줘야 input이 css가 안이상해짐 */}
                    </tr>
                    <tr>
                      <td>휴대폰</td>
                      <td>
                        <Container>
                          <Row>
                            <Col className="p-0 m-0" xs={3}><FormControl id="ph-number" /></Col>
                            <Col className="p-0 m-0" xs={1}>-</Col>
                            <Col className="p-0 m-0" xs={3}><FormControl id="ph-number" /></Col>
                            <Col className="p-0 m-0" xs={1}>-</Col>
                            <Col className="p-0 m-0" xs={3}><FormControl id="ph-number" /></Col>
                          </Row>
                        </Container>

                      </td>
                      <td className="p-0"></td>
                    </tr>
                    <tr>
                      <td>이메일</td>
                      <td>
                        <Container>
                          <Row>
                            <Col className="p-0 m-0" xs={5}><FormControl id="email-id" /></Col>
                            <Col className="p-0 m-0" xs={1}>@</Col>
                            <Col className="p-0 m-0" xs={6}>
                              {/* 이상하게 Form.Select가 없어서 react-bootstrap사이트 가서 inspect보고 적음... */}
                              <select className="form-select">
                                <option>gmail.com</option>
                                <option>naver.com</option>
                                <option>daum.com</option>
                                <option>직접입력</option>
                              </select>
                            </Col>
                          </Row>
                        </Container>
                      </td>
                      <td className="p-0"></td>
                    </tr>
                  </Table>

                  <div className="form-sub-title"><h5 className="fw-bold">학생 정보</h5></div>
                  <div id="isStudent"><Form.Check className="mb-2" label="학생 아님"></Form.Check></div>
                  <Table>
                    <tr>
                      <td>단과대학</td>
                      <td>
                        <select className="form-select">
                          <option>ICT융합대학</option>
                          <option>ICT융합대학</option>
                          <option>ICT융합대학</option>
                        </select>
                      </td>
                      <td className="p-0"></td> {/*왜인지 모르지만 이 요상한 td를 하나 더 넣어줘야 input이 css가 안이상해짐 */}
                    </tr>
                    <tr>
                      <td>학과</td>
                      <td>
                        <select className="form-select">
                          <option>ICT융합대학</option>
                          <option>ICT융합대학</option>
                          <option>ICT융합대학</option>
                        </select>
                      </td>
                      <td className="p-0"></td> {/*왜인지 모르지만 이 요상한 td를 하나 더 넣어줘야 input이 css가 안이상해짐 */}
                    </tr>
                    <tr>
                      <td>학번</td><td><FormControl id="school-id" /></td>
                      <td className="p-0"></td>
                    </tr>
                  </Table>

                  <Button variant="secondary">이전</Button>
                  <Button variant="warning" type="submit">회원가입</Button>
                </Form>
              </div>
            </Col>
          </Row>
        </Container>
      </Card >
    </>
  );
}

export default JoinForm;