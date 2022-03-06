import React from "react";

function AbsenceUpdate({ changeMode }) {
    return (
        <div className="container noblur">
          <div className="container_title">
            <h3>휴가 상세</h3>
            <div className="input_form" />
            <div className="input_form" />
            <div className="date_time_box">
              <div className="date_time" type="date"/>
              <div className="date_time" type="date"/>
            </div>
            <div className="textarea_form" />
            <div className="input_form" />
            <div className="input_form" />
            <div className="button_form">
              <p>휴가 취소하기</p>
            </div>
            <div className="atag link_form" onClick={() => changeMode(1)}>
              휴가 홈
            </div>
          </div>
        </div>
      );
}

export default AbsenceUpdate;
