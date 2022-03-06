import React from "react";
import { Link } from "react-router-dom";

function Register() {
  return (
    <>
      <div className="container">
        <div className="container_title abr">
          <h2>MILINEWS</h2>
          <p className="explain_msg">
            계정을 만들면{" "}
            <Link to="/useExplain" className="atag theme_highlight">
              이용약관
            </Link>{" "}
            및 <br />
            <Link to="/privacyExplain" className="atag theme_highlight">
              개인정보 취급방침
            </Link>
            에 동의하는 것입니다.
          </p>
        </div>
        <input className="input_form" placeholder="이메일" />
        <input className="input_form" placeholder="비밀번호" />
        <div className="button_form">
          <p>가입하기</p>
        </div>
        <p className="explain_msg">이미 계정이 있으신가요?</p>
        <Link to="/login" className="atag link_form">
          로그인
        </Link>
      </div>
    </>
  );
}

export default Register;
