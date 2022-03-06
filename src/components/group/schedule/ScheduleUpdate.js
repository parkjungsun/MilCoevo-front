import React from "react";

function ScheduleUpdate({ changeMode }) {
    return (
        <div className="container noblur">
          <div className="container_title">
            <h3>일정 상세</h3>
            <div className="input_form" />
            <div className="date_time_box">
              <div className="date_time1" />
              <div className="date_time2" />
            </div>
            <div className="textarea_form"/>
            <div className="input_form"/>
            <div className="input_form"/>
            <div className="button_form">
              <p>일정 취소하기</p>
            </div>
            <div className="atag link_form" onClick={() => changeMode(1)}>
              일정 홈
            </div>
          </div>
        </div>
      );
}

export default ScheduleUpdate;