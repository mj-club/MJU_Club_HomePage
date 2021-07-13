import React from "react";
import LoginForm from '../components/Auth/LoginForm';
import Pagenation from "../components/Pagenation";

function Login() {
  return (
    <>
    {/* <Pagenation title={"로그인"} menu1={"HOME"} menu2={"마이페이지"} menu3={"프로필"}/> */}
    <LoginForm />
    </>
  );
}

export default Login;