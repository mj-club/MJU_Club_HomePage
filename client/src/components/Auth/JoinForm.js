  import React from "react";
  import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
  import { faCircle, faUnlockAlt } from "@fortawesome/free-solid-svg-icons";
  import { Button, Table, InputGroup, FormControl, Form, Container, Col, Row, Card, FormGroup } from 'react-bootstrap';
  import "../../style/JoinForm.css"

  function goBack() {
    window.history.back();
  };

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
                  <div className="form-title">회원가입</div>
                  <Form>
                    {/* start of table1 */}
                    <div className="form-sub-title"><h5 className="fw-bold">아이디 정보</h5></div>
                    <Table className="form-table">
                      <tbody>
                        <tr>
                          <td>
                            <Form.Label className="form-labels" >아이디</Form.Label>
                            <FormControl id="id" />
                            <Button id="valid-btn" variant="warning" className="p-1 mt-1">중복확인</Button>
                          </td>
                          <td className="p-0 m-0"></td>
                        </tr>
                        <tr>
                          <td>
                            <Form.Label className="form-labels">비밀번호</Form.Label>
                            <FormControl id="pw" />
                          </td>
                          <td className="p-0 m-0"></td>
                        </tr>
                        <tr>
                          <td>
                            <Form.Label className="form-labels">비밀번호 확인</Form.Label>
                            <FormControl id="checkPw" />
                          </td>
                          <td className="p-0 m-0"></td>
                          {/* 왜인지 모르지만 이 이상한걸 넣어야 css가 안이상해짐 */}
                        </tr>
                      </tbody>
                    </Table>
                    {/* end of table1 */}

                    <div className="form-sub-title"><h5 className="fw-bold">개인 정보</h5></div>
                    <Table className="form-table">
                      <tbody>
                        <tr>
                          <td>
                            <Form.Label className="form-labels">이름</Form.Label>
                            <FormControl id="id" />
                          </td>
                          <td className="p-0"></td>
                        </tr>
                        <tr>
                          <td>
                            <Form.Label className="form-labels">휴대폰</Form.Label>
                            <Container className="p-0 m-0 text-center">
                              <Row>
                                <Col className="p-0 m-0" xs={3}><FormControl id="ph-number" /></Col>
                                <Col className="p-0 m-0" xs={1}>-</Col>
                                <Col className="p-0 m-0" xs={3}><FormControl id="ph-number" /></Col>
                                <Col className="p-0 m-0" xs={1}>-</Col>
                                <Col className="p-0 m-0" xs={4}><FormControl id="ph-number" /></Col>
                              </Row>
                            </Container>
                          </td>
                        </tr>
                        <tr>
                          <td>
                            <Form.Label className="form-labels">이메일</Form.Label>
                            <Container className="p-0 m-0 text-center">
                              <Row>
                                <Col className="p-0 m-0" xs={5}><FormControl id="email-id" /></Col>
                                <Col className="p-0 m-0" xs={1}>@</Col>
                                <Col className="p-0 m-0" xs={6}>
                                  {/* 이상하게 <Form.Select />가 없어서 react-bootstrap사이트 가서 inspect보고 적음... */}
                                  <select className="form-select">
                                    <option>gmail.com</option>
                                    <option>naver.com </option>
                                    <option>daum.com</option>
                                    <option>직접입력</option>
                                  </select>
                                </Col>
                              </Row>
                            </Container>
                          </td>
                        </tr>
                      </tbody>
                    </Table>

                    <div className="form-sub-title"><h5 className="fw-bold">학생 정보</h5></div>
                    <div id="isStudent"><Form.Check className="mb-2" label="학생 아님"></Form.Check></div>
                    <Table className="form-table">
                      <tbody>
                        <tr>
                          <td>
                            <Form.Label className="form-labels">단과대학</Form.Label>
                            <select className="form-select">
                              <option>인문대학</option>
                              <option>사회과학대학</option>
                              <option>경영대학</option>
                              <option>법과대학</option>
                              <option>ICT융합대학</option>
                              <option>미래융합대학</option>
                              <option>방목기초교육대학</option>
                            </select>
                          </td>
                          <td className="p-0"></td>
                        </tr>

                        <tr>
                          <td>
                            <Form.Label className="form-labels">학과</Form.Label>
                            <select className="form-select">
                              <option>국어국문학과</option>
                              <option>중어중문학과</option>
                              <option>일어일문학과</option>
                              <option>영어영문학과</option>
                              <option>사학과</option>
                              <option>문헌정보학과</option>
                              <option>아랍지역학과</option>
                              <option>미술사학과</option>
                              <option>철학과</option>
                              <option>문예창작과</option>
                              <option>행정학과</option>
                              <option>경제학과</option>
                              <option>정치외교학과</option>
                              <option>디지털미디어학과</option>
                              <option>아동학과</option>
                              <option>청소년지도학과</option>
                              <option>경영학과</option>
                              <option>국제통상학과</option>
                              <option>경영정보학과</option>
                              <option>부동산학과</option>
                              <option>법학과</option>
                              <option>법무정책학과</option>
                              <option>디지털콘텐츠디자인학과</option>
                              <option>융합소프트웨어학과</option>
                              <option>창의융합인재학부</option>
                              <option>사회복지학과</option>
                              <option>부동산학과</option>
                              <option>법무행정학과</option>
                              <option>심리치료학과</option>
                              <option>미래융합경영학과</option>
                              <option>멀티디자인학과</option>
                              <option>전공자유학부</option>
                              <option>융합전공학부</option>
                            </select>
                          </td>
                          <td className="p-0"></td>
                        </tr>
                        <tr>
                          <td>
                            <Form.Label className="form-labels">학번</Form.Label>
                            <FormControl id="school-id" />
                          </td>
                        </tr>
                      </tbody>
                    </Table>

                    <Button variant="secondary" className="mr-1" onClick={goBack}>이전</Button>
                    <Button variant="warning" className="ml-1" type="submit" href="/find_id_pw">회원가입</Button>
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