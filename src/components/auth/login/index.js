import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, Navigate } from "react-router-dom";

import { checkToken, userlogin } from "../../../modules/token";
import { GOOGLE_AUTH_URL, NAVER_AUTH_URL, KAKAO_AUTH_URL } from "../../../api";

function Login() {
  const dispatch = useDispatch();

  const token = useSelector((state) => state.token);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onEmailHandler = (event) => {
    setEmail(event.currentTarget.value);
    onEmailValidation(event.currentTarget.value);
  };

  const onPasswordHandler = (event) => {
    setPassword(event.currentTarget.value);
    onPasswordValidation(event.currentTarget.value);
  };

  const [emailv, setEamilv] = useState(true);
  const [passwordv, setPasswordv] = useState(true);

  const onEmailValidation = (val) => {
    var regExp =
      /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i;
    setEamilv(regExp.test(val));
  };

  const onPasswordValidation = (val) => {
    var regExp = /^(?=.*\d)(?=.*[a-zA-Z])[0-9a-zA-Z]{8,10}$/;
    setPasswordv(regExp.test(val));
  };

  const onSummit = () => {
    if(email.length === 0 || password === 0) {
      onEmailValidation(email);
      onPasswordValidation(password);
    } else if (emailv && passwordv) {
      const data = {
        email,
        password,
      };
      dispatch(userlogin(data));
    } else {
      alert("입력값을 확인해주세요");
    }
  };

  useEffect(() => {
    if(token === "NONE") {
      dispatch(checkToken());
    }
  }, [token, dispatch]);

  if (token === "NONE") {
    return <div>...Loading</div>;
  }

  if (token !== "") {
    return <Navigate to="/members" />;
  }

  return (
    <>
      <div className="container">
        <div className="container_title abl">
          <h2>MILINEWS</h2>
        </div>
        <button onClick={() => window.location.replace(NAVER_AUTH_URL)} className="atag social_login">
          <p>Naver 계정으로 로그인</p>
        </button>
        <button onClick={() => window.location.replace(KAKAO_AUTH_URL)} className="atag social_login">
          <p>Kakao 계정으로 로그인</p>
        </button>
        <button onClick={() => window.location.replace(GOOGLE_AUTH_URL)} className="atag social_login">
          <p>Google 계정으로 로그인</p>
        </button>
        <div className="login_blank" />
        <div className="straight_line" />
        <div className="login_other">또는</div>
        <input
          className="input_form"
          type="email"
          placeholder="이메일"
          maxLength="30"
          value={email}
          onChange={onEmailHandler}
        />
        <p className={emailv ? "none" : "error"}>
          이메일 형식이 맞지 않습니다.
        </p>
        <input
          className="input_form"
          type="password"
          placeholder="비밀번호"
          maxLength="10"
          value={password}
          onChange={onPasswordHandler}
        />
        <p className={passwordv ? "none" : "error"}>
          비밀번호 형식 영문 숫자 조합 8 ~ 10자
        </p>
        <div className="button_form" onClick={() => onSummit()}>
          <p>로그인</p>
        </div>
        <p className="explain_msg">계정이 없으세요?</p>
        <button onClick={() => window.location.replace("/register")} className="atag link_form">
          가입하기
        </button>
      </div>
    </>
  );
}

export default Login;
