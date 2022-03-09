import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, Navigate } from "react-router-dom";
import { userRegister } from "../../../api/auth";

import { checkToken } from "../../../modules/token";

function Register() {
  const dispatch = useDispatch();

  const token = useSelector((state) => state.token);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [process, setProcess] = useState(false);

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
      setProcess(userRegister(data));
    } else {
      alert("입력값을 확인해주세요");
    }
  };

  useEffect(() => {
    if(token === "NONE") {
      dispatch(checkToken());
    }
  }, [token, dispatch]);

  if(process) {
    return <Navigate to="/login" />;
  }

  if (token === "NONE") {
    return <div>...Loading</div>;
  }

  if (token !== "") {
    return <Navigate to="/members" />;
  }

  return (
    <>
      <div className="container">
        <div className="container_title abr">
          <h2>MILINEWS</h2>
          <p className="explain_msg">
            계정을 만들면
            <Link to="/useExplain" className="atag theme_highlight">
              이용약관
            </Link>
            및 <br />
            <Link to="/privacyExplain" className="atag theme_highlight">
              개인정보 취급방침
            </Link>
            에 동의하는 것입니다.
          </p>
        </div>
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
          비밀번호는 영문 숫자 조합 8 ~ 10자입니다.
        </p>
        <div className="button_form" onClick={() => onSummit()}>
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
