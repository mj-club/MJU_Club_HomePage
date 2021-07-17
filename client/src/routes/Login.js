import React from "react";
import LoginForm from "../components/Auth/LoginForm";
import JoinForm from "../components/Auth/JoinForm";
import RightTitle from "../components/RightTitle";

function Login() {
  return (
    <>
      {/* <LoginForm /> */}
      <RightTitle
        title={"로그인"}
        menu1={"HOME"}
        menu2={"마이페이지"}
        menu3={"프로필"}
      />
      <JoinForm />
    </>
  );
}

export default Login;
