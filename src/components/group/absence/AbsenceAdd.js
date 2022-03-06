import React from "react";

function AbsenceAdd({ changeMode }) {
    return (
        <div className="container noblur">
          <div className="container_title">
            <h3>휴가 신청</h3>
            <input className="input_form" placeholder="제목" />
            <select className="select_form">
                <option value="연가">연가</option>
                <option value="연가">공가</option>
            </select>
            <div className="date_time_box">
              <input className="date_time" type="date"/>
              <input className="date_time" type="date"/>
            </div>
            <textarea className="textarea_form" placeholder="상세 내용" />
            <div className="button_form">
              <p>신청하기</p>
            </div>
            <div className="atag link_form" onClick={() => changeMode(1)}>
              휴가 홈
            </div>
          </div>
        </div>
      );
}

export default AbsenceAdd;
