import React from "react";
import { Link } from "react-router-dom";

import { GOOGLE_AUTH_URL, NAVER_AUTH_URL, KAKAO_AUTH_URL } from "../../../api";

function Login() {
  return (
    <>
      <div className="container">
        <div className="container_title abl">
          <h2>MILINEWS</h2>
        </div>
        <a href={NAVER_AUTH_URL} className="atag social_login">
          <p>Naver 계정으로 로그인</p>
        </a>
        <a href={KAKAO_AUTH_URL} className="atag social_login">
          <p>Kakao 계정으로 로그인</p>
        </a>
        <a href={GOOGLE_AUTH_URL} className="atag social_login">
          <p>Google 계정으로 로그인</p>
        </a>
        <div className="login_blank"/>
        <div className="straight_line" />
        <div className="login_other">또는</div>
        <input className="input_form" placeholder="이메일" />
        <input className="input_form" placeholder="비밀번호" />
        <div className="button_form">
          <p>로그인</p>
        </div>
        <p className="explain_msg">계정이 없으세요?</p>
        <Link to="/register" className="atag link_form">가입하기</Link>
      </div>
    </>
  );
}

export default Login;
