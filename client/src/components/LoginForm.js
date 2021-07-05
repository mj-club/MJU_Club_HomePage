import React from "react";
import "./LoginForm.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faCircle, faUnlockAlt, faUser} from "@fortawesome/free-solid-svg-icons";

function LoginForm() {
  return (
    <div className="body">
      <span className="fa-layers">
        <FontAwesomeIcon icon={faCircle} color="#F1C40F" size="4x" transform="up-5 left-5"/>
        <FontAwesomeIcon icon={faUnlockAlt} inverse size="4x" transform="shrink-6 up-5 left-4"/>
      </span>
      <div className="form-title">로그인</div>
      <form className="login-form">
        <div className="inputs">
          <span class="add-on"><FontAwesomeIcon id='user-icon' icon={faUser}/></span>
          <input id="id" type="text" placeholder="아이디"></input>
          <input id="pw" type="password" placeholder="비밀번호"></input>
        </div>
        <button type="submit">로그인</button>
        <button>카카오 로그인</button>
        <div className="links">
          <a href="#" id="join">회원가입</a>
          <a href="#" id="find">ID/PW찾기</a>
        </div>
      </form>
    </div>
  );
}

export default LoginForm;