import React, { useState } from "react";
import { Link } from "react-router-dom";
import Header from "../../common/header";

function Register() {
  const [step, setStep] = useState(1);
  if (step === 1) {
    return (
      <>
        <Header />
        <div className="container noblur mt">
          <div className="container_title abl">
            <h3>그룹 가입</h3>
          </div>
          <input className="input_form" placeholder="그룹 초대코드" />
          <div className="button_form" onClick={() => setStep(2)}>
            <p>계속</p>
          </div>
          <Link to="/members" className="atag link_form">
            뒤로가기
          </Link>
        </div>
      </>
    );
  } else {
    return (
      <>
        <Header />
        <div className="container noblur mt">
          <div className="container_title abr">
            <h3>그룹 가입</h3>
            <p>정보체계관리단 개발과<br/>(123egi83fvw)</p>
          </div>
          <input className="input_form" placeholder="업무 및 직책" />
          <input className="input_form" placeholder="이름" />
          <div className="button_form">
            <p>가입하기</p>
          </div>
          <div className="atag link_form" onClick={() => setStep(1)}>
            뒤로가기
          </div>
        </div>
      </>
    );    
  }
}

export default Register;
