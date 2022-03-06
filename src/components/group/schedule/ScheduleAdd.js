import React from "react";

function ScheduleAdd({ changeMode }) {
  return (
    <div className="container noblur">
      <div className="container_title">
        <h3>새 일정 등록</h3>
        <input className="input_form" placeholder="일정 명" />
        <div className="date_time_box">
          <input className="date_time1" type="date" />
          <input className="date_time2" type="time" />
        </div>
        <textarea className="textarea_form" placeholder="내용" />
        <div className="button_form">
          <p>등록하기</p>
        </div>
        <div className="atag link_form" onClick={() => changeMode(1)}>
          일정 홈
        </div>
      </div>
    </div>
  );
}

export default ScheduleAdd;
