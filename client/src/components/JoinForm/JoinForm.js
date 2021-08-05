import React, { Fragment } from 'react';
import { useForm } from "react-hook-form";

const JoinForm = () => {
  const { register, handleSubmit, errors } = useForm({
    mode: "onBlur"
  });
  const onSubmit = data => console.log(data);
  console.log("error", errors);

  return (
    <>
      <style type="text/css">
        {`
      .check-student{
        text-align: right;
      }

      .form-select{
        width: 100%;
        min-height: 56px;
        padding: 3px 20px;
        color: #748494;
        border: 1px solid #F5F5F5;
        border-radius: 5px;
        outline: none;
        background-color: #F5F5F5;
      }
      `}
      {/* css더 똑같이 고치기?? */}
      </style>
      <Fragment>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="col-md-12 col-12 mb-4">
            <p>이메일</p>
            <input type="email" placeholder="Email *" name="email" ref={register({
              required: '이메일을 입력해주세요',
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                message: "잘못된 이메일입니다"
              }
            })} />
            {errors.email && <p>{errors.email.message}</p>}
          </div>

          <p>비밀번호</p>
          <div className="col-md-12 col-12 mb-4">
            <input type="password" placeholder="Pssword *" name="password" 
            ref={register({
              required: "비밀번호를 입력해주세요", 
              minLength: 8, 
              maxLength: 20,
              pattern: {
                value: /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]$/,
                message: "비밀번호는 영문, 숫자, 특수문자를 포함한 8~20글자입니다"
              }
              }) }/>
              {errors.password && <p>{errors.password.message}</p>}

          </div>
          <div className="col-md-12 col-12 mb-4">
            <input type="password" placeholder="Check Pssword *" name="check-password" />
          </div>

          <p>개인정보</p>
          {/* 이름 */}
          <div className="col-md-12 col-12 mb-4">
            <input type="text" placeholder="Your Name *" name="name" ref={register({ required: 'Name is required' })} />
            {errors.name && <p>{errors.name.message}</p>}
          </div>
          {/* 핸드폰 */}
          <div className="col-md-12 col-12 mb-4">
            <input type="text" placeholder="PhoneNumber * ex)01012341234" name="ph" />
          </div>

          <div className="check-student">
            <input type="checkbox" name="isStudent" />
            <label>&nbsp;학생</label>
          </div>
          <p>학생정보</p>
          <div className="col-md-12 col-12 mb-4">
            {/* 단과대학 */}
            <select className="form-select">
              <option>단과대학</option>
              <option>인문대학</option>
              <option>사회과학대학</option>
              <option>경영대학</option>
              <option>법과대학</option>
              <option>ICT융합대학</option>
              <option>미래융합대학</option>
              <option>방목기초교육대학</option>
            </select>
          </div>

          <div className="col-md-12 col-12 mb-4">
            {/* 학과 */}
            <select className="form-select">
              <option>학과</option>
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
          </div>
          {/* 학년 */}
          <div className="col-md-12 col-12 mb-4">
            <select className="form-select">
              <option>1</option>
              <option>2</option>
              <option>3</option>
              <option>4</option>
            </select>
          </div>

          <div className="col-md-12 col-12 mb-4">
            <input type="text" placeholder="학번 * ex)60123456" name="school-id" />
          </div>

          {/* submit   */}
          <div className="col-12 text-center mb-4">
            <button className="btn btn-primary btn-hover-secondary">회원가입</button>
          </div>
        </form>
        <p className="form-messege"></p>
      </Fragment>
    </>
  )
}

export default JoinForm;
