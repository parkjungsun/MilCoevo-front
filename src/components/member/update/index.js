import React from "react";
import { Link } from "react-router-dom";
import Header from "../../common/header";

function UpdateMember() {
  return (
    <>
      <Header />
      <div className="container noblur">
        <div className="container_title abr">
          <h3>정보 수정</h3>
          <p>
            정보체계관리단 개발과
            <br />
            (123egi83fvw)
          </p>
        </div>
        <div className="input_form bg"><p>test@naver.com</p></div>
        <div className="input_form bg"><p>팀원</p></div>
        <input className="input_form" placeholder="업무 및 직책" value="" />
        <input className="input_form" placeholder="이름" value="" />
        <div className="button_form">
          <p>저장</p>
        </div>
        <Link to="/members" className="atag link_form">
          뒤로가기
        </Link>
        <div className="group_out">
            <p>그룹 탈퇴</p>
        </div>
      </div>
    </>
  );
}

export default UpdateMember;
