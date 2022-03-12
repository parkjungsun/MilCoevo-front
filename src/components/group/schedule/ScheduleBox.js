import React from "react";
import { getTime } from "../../../utils/dateUtil";

function ScheduleBox({
  changeMode,
  workDate,
  title,
  position,
  nickname,
  processStatus,
  scheduleId,
  changePage
}) {

  const moveToPage = () => {
    changePage(scheduleId);
    changeMode(3);
  }

  return (
    <>
      <div className="list_block" onClick={() => moveToPage()}>
        <div className="list_front list_content">
          <p>{getTime(workDate)}</p>
        </div>
        <div
          className={
            processStatus === "SUGGESTED"
              ? "list_mid list_content "
              : "list_mid list_content list_cancel"
          }
        >
          <p>{title}</p>
        </div>
        <div className="list_rear list_content">
          <p>{position} {nickname}</p>
        </div>
      </div>
    </>
  );
}

export default ScheduleBox;
