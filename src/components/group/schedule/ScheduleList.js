import React from "react";
import ScheduleBox from "./ScheduleBox";
import ToolBox from "./ToolBox";

function ScheduleList({ changeMode }) {
  return (
    <div className="info_container">
      <div className="search_box">
        <div className="search_condition spbw">
          <div className="search_button">이전</div>
          <div className="search_duration">2022.03.07 ~ 2022.03.13</div>
          <div className="search_button">다음</div>
        </div>
        <div className="search_condition">
          <select className="search_select">
            <option value="">전체 일정</option>
            <option value="">반영된 일정</option>
            <option value="">취소된 일정</option>
          </select>
        </div>
      </div>
      <div className="list_date"><p>2022.03.07.</p><span>2건</span></div>
      <ScheduleBox changeMode={changeMode} />
      <ScheduleBox changeMode={changeMode} />
      <div className="list_date"><p>2022.03.07.</p><span>2건</span></div>
      <ScheduleBox changeMode={changeMode} />
      <ScheduleBox changeMode={changeMode} />
      <ToolBox changeMode={changeMode} />
    </div>
  );
}

export default ScheduleList;
