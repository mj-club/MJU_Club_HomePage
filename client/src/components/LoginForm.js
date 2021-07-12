<<<<<<< HEAD
import React from "react";
import "../style/LoginForm.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faCircle, faUnlockAlt, faUser} from "@fortawesome/free-solid-svg-icons";
=======
import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import "./LoginForm.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircle,
  faUnlockAlt,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
>>>>>>> 3499e76df2451bf416d3847f13e85289e43f91c5

function LoginForm() {
  return (
    <div className="body">
      <span className="fa-layers">
        <FontAwesomeIcon
          icon={faCircle}
          color="#F1C40F"
          size="4x"
          transform="up-5 left-5"
        />
        <FontAwesomeIcon
          icon={faUnlockAlt}
          inverse
          size="4x"
          transform="shrink-6 up-5 left-4"
        />
      </span>
      <div className="form-title">로그인</div>
      <form className="login-form">
        <div className="inputs">
          <span class="add-on">
            <FontAwesomeIcon id="user-icon" icon={faUser} />
          </span>
          <input id="id" type="text" placeholder="아이디"></input>
          <input id="pw" type="password" placeholder="비밀번호"></input>
        </div>
        <button type="submit">로그인</button>
        <button>
          <a href="http://localhost:3001/auth/kakao">카카오 로그인</a>
        </button>
        <div className="links">
          <a href="#" id="join">
            회원가입
          </a>
          <a href="#" id="find">
            ID/PW찾기
          </a>
        </div>
      </form>
    </div>
  );
}

export default LoginForm;
