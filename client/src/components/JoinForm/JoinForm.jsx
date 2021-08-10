import React, { Fragment, useState } from 'react';
import { useForm} from "react-hook-form";
import { join, emailCheck } from "../../actions";
import { useDispatch, useSelector } from "react-redux";

//TODO
// 이미 가입된 이메일입니다
// action, reducer
// 전화번호placeholder, text
// 학과선택 readonly
// 대학 선택하면 해당 대학 학과만 보이게
// 전화번호 - 들어가면 에러

const JoinForm = () => {
  //validation
  const { register, handleSubmit, setError, errors } = useForm({
    mode: "onBlur"
  });
  const onSubmit = data => console.log(data);
  console.log("error", errors);

  // store value
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const [name, setName] = useState(null);
  const [phNumber, setPhNumber] = useState(null);
  const [isStudent, setIsStudent] = useState(false);
  const [department, setDepartment] = useState(null);
  const [schoolYear, setSchoolYear] = useState(null);
  const [studentId, setStudentId] = useState(null);
  const [major, setMajor] = useState(null);
  const [isEmailExist, setIsEmailExist] = useState(false); // check duplicate

  const emailCheckedMessage = useSelector((state) => state.authReducer.message);

  function onEmailCheck() {
    //emailCheck구현하기
    dispatch(emailCheck(email));
    //emailCheck가 잘 되면 isEmailchecked true로 설정하기
    if (emailCheckedMessage == "사용가능한 이메일입니다") {
      setIsEmailExist(false);
    } else {
      setIsEmailExist(true);
    }
    console.log(isEmailExist);
  } //왜 ;쓰면 안돼지?

  function onPhCheck() {
    
  }

  function onStudentIdCheck(){

  }

  const dispatch = useDispatch();

  function onJoin() {
    //Form에 적절한 값이 들어가면 
    //href="/welcome"으로 이동
    const body = { email, name, password, phNumber, department, schoolYear, studentId, major };
    dispatch(join(body));
  }

  return (
    <>
      <style type="text/css">
        {`
      .is-student{
        color: #343a40;
        text-align: center;
        font-size: 20px;
        font-weight: bold;
        margin-top: 60px;
      }

      .float-right{
        margin-top : 5px;
        float: right;
      }
    
      .text-end{
        margin-top : 5px;
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

      .emailcheck{
        font-size: 12px;
        line-height: 35px;
        height: 30px;
        padding: 0 15px;
      }
      `}
        {/* css - 글자 색이 조금 다른 부분 더 똑같이 고치기 */}
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
              },
              //isEmailExist가 true면 error -> "이미 가입된 이메일입니다."
            })} onChange={
              ({ target: { value } }) => setEmail(value)
            } />
            <div className="float-right">
              <button className="btn btn-primary btn-hover-secondary emailcheck"
                onClick={() => {
                  onEmailCheck();
                }
                }>중복확인</button>
            </div>

            {errors.email && <p>{errors.email.message}</p>}



          </div>

          <p>비밀번호</p>
          <div className="col-md-12 col-12 mb-4">
            <input type="password" placeholder="Pssword *" name="password"
              ref={register({
                required: "비밀번호를 입력해주세요",
                minLength: {
                  value: 8,
                  message: "비밀번호는 영문, 숫자, 특수문자를 포함한 8~20글자입니다"
                },
                maxLength: 20,
                pattern: {
                  value: /[a-zA-Z0-9!@#$%^&*()-=+;'":,.]$/,
                  message: "비밀번호는 영문, 숫자, 특수문자를 포함한 8~20글자입니다"
                }
              })} onChange={
                ({ target: { value } }) => setPassword(value)
              } />
            {errors.password && <p>{errors.password.message}</p>}

          </div>
          <div className="col-md-12 col-12 mb-4">
            <input type="password" placeholder="Check Pssword *" name="checkPassword" 
              ref={register({
                required: "비밀번호를 다시 한번 입력해주세요"               
              })}
              onBlur={({ target: { value } }) => {
                const password = document.getElementsByName("password")[0].value;
                console.log("passwrd", password);
                console.log("check-password", value);
                const isSamePw = password==value;
                console.log(isSamePw);
                if(!isSamePw){
                  setError("checkPassword", {
                    type: "isSame",
                    message: "비밀번호가 다릅니다",
                  });
                }
              }}
                />
            {errors.checkPassword && <p>{errors.checkPassword.message}</p>}
          </div>

          <p>개인정보</p>
          {/* 이름 */}
          <div className="col-md-12 col-12 mb-4">
            <input type="text" placeholder="Your Name *" name="name"
              ref={register({ required: 'Name is required' })}
              onChange={({ target: { value } }) => setName(value)} />
            {errors.name && <p>{errors.name.message}</p>}
          </div>
          {/* 핸드폰 */}
          <div className="col-md-12 col-12 mb-4">
            <input type="number" placeholder="01012341234 *" name="ph"
              ref={register({
                required: "핸드폰 번호를 입력해주세요",
                maxLength: 11
              })}
              onChange={
                ({ target: { value } }) => setPhNumber(value)
              } />
            <div className="float-right">
              <button className="btn btn-primary btn-hover-secondary emailcheck"
                onClick={() => {
                  onPhCheck();
                }
                }>중복확인</button>
            </div>

            {errors.ph && <p>{errors.ph.message}</p>}


          </div>

          <p className="is-student">
            <input type="checkbox" name="isStudent" onChange={({ target: { value } }) => setIsStudent(value)} />
            <label>&nbsp;명지대 학생입니다</label>
          </p>
          {isStudent /*가 true면 밑에내용보여줌  */}

          <p>학생정보</p>
          <div className="col-md-12 col-12 mb-4">
            {/* 단과대학 */}
            <select className="form-select" onChange={({ target: { value } }) => setDepartment(value)}>
              <option value="null">단과대학 선택</option>
              <option value="인문대학">인문대학</option>
              <option value="사회과학대학">사회과학대학</option>
              <option value="경영대학">경영대학</option>
              <option value="법과대학">법과대학</option>
              <option value="ICT융합대학">ICT융합대학</option>
              <option value="미래융합대학">미래융합대학</option>
              <option value="방목기초교육대학">방목기초교육대학</option>
            </select>
          </div>

          <div className="col-md-12 col-12 mb-4">
            {/* 학과 */}
            <select className="form-select" onChange={({ target: { value } }) => setMajor(value)}>
              <option value="null">학과</option>
              <option value="국어국문학과">국어국문학과</option>
              <option value="중어중문학과">중어중문학과</option>
              <option value="일어일문학과">일어일문학과</option>
              <option value="영어영문학과">영어영문학과</option>
              <option value="사학과">사학과</option>
              <option value="문헌정보학과">문헌정보학과</option>
              <option value="아랍지역학과">아랍지역학과</option>
              <option value="미술사학과">미술사학과</option>
              <option value="철학과">철학과</option>
              <option value="문예창작과">문예창작과</option>
              <option value="행정학과">행정학과</option>
              <option value="경제학과">경제학과</option>
              <option value="정치외교학과">정치외교학과</option>
              <option value="디지털미디어학과">디지털미디어학과</option>
              <option value="아동학과">아동학과</option>
              <option value="청소년지도학과">청소년지도학과</option>
              <option value="경영학과">경영학과</option>
              <option value="국제통상학과">국제통상학과</option>
              <option value="경영정보학과">경영정보학과</option>
              <option value="부동산학과">부동산학과</option>
              <option value="법학과">법학과</option>
              <option value="법무정책학과">법무정책학과</option>
              <option value="디지털콘텐츠디자인학과">디지털콘텐츠디자인학과</option>
              <option value="융합소프트웨어학과">융합소프트웨어학과</option>
              <option value="창의융합인재학부">창의융합인재학부</option>
              <option value="사회복지학과">사회복지학과</option>
              <option value="부동산학과">부동산학과</option>
              <option value="법무행정학과">법무행정학과</option>
              <option value="심리치료학과">심리치료학과</option>
              <option value="미래융합경영학과">미래융합경영학과</option>
              <option value="멀티디자인학과">멀티디자인학과</option>
              <option value="전공자유학부">전공자유학부</option>
              <option value="융합전공학부">융합전공학부</option>
            </select>
          </div>
          {/* 학년 */}
          <div className="col-md-12 col-12 mb-4" onChange={({ target: { value } }) => setSchoolYear(value)}>
            <select className="form-select">
              <option>1</option>
              <option>2</option>
              <option>3</option>
              <option>4</option>
            </select>
          </div>

          <div className="col-md-12 col-12 mb-4">
            <input type="text" placeholder="학번 * ex)60123456" name="school-id"
              onChange={({ target: { value } }) => setStudentId(value)}
            />

            <div className="text-end">
              <button className="btn btn-primary btn-hover-secondary emailcheck"
                onClick={() => {
                  onStudentIdCheck();
                }
                }>중복확인</button>
            </div>
          </div>

          {/* submit   */}
          <div className="col-12 text-center mb-4">
            <button className="btn btn-primary btn-hover-secondary"
              onClick={() => {
                if (isEmailExist == false) {
                  onJoin();
                }
              }
              }>회원가입</button>
          </div>
        </form>
        <p className="form-messege"></p>
      </Fragment>
    </>
  )
}

export default JoinForm;
