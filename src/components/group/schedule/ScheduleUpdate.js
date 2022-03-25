import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { clearSchedule, getSchedule, updateSchedule } from "../../../modules/schedule";
import { useParams } from "react-router-dom";
import { getTime, plusDate, plusDay } from "../../../utils/dateUtil";
import peopleImg from "../../../image/people.png";
import penImg from "../../../image/peng.png";
import delImg from "../../../image/delbox.png";

function ScheduleUpdate({ changeMode, changePage, page }) {
  const dispatch = useDispatch();

  const { id } = useParams();
  const token = useSelector((state) => state.token);
  const schedule = useSelector((state) => state.schedule);
  const member = useSelector((state) => state.member);

  const moveToPage = () => {
    changePage(null);
    changeMode(1);
  };

  const onCancel = () => {
    if(window.confirm("취소 하시겠습니까?")) {
      dispatch(updateSchedule(token, id, page, { processStatus: "WITHDRAW" }));
    }
  }

  useEffect(() => {
    if(page !== null) {
      dispatch(getSchedule(token, id, page));
    }
    return () => {
      dispatch(clearSchedule());
    };
  }, [token, id, page, dispatch]);

  return (
    <div className="container noblur">
      <div className="container_title">
        <h3>일정 상세</h3>
        <div className="input_form bg" >{schedule.title}</div>
        <div className="date_time_box">
          <div className="input_form w_s_dt1 bg" >{plusDate(schedule.workDate, 0)}.{plusDay(schedule.workDate, 0)}</div>
          <div className="input_form w_s_dt2 bg" >{getTime(schedule.workDate)}</div>
        </div>
        <textarea className="textarea_form bg" value={schedule.content} readOnly disabled/>
        <div className="input_form h_dl bg" >
          <img src={peopleImg} alt="" className="fs_sw"/>
          {schedule.drafterPosition} {schedule.drafterNickname}
          <br />
          <img src={penImg} alt="" className="fs_sw"/>
          {plusDate(schedule.createdDate, 0)} {getTime(schedule.createdDate)}
        </div>
        {schedule.arbiterEmail !== null 
        ?<div className="input_form h_dl bg" >
          <img src={peopleImg} alt="" className="fs_sw"/>
          {schedule.arbiterPosition} {schedule.arbiterNickname}
          <br />
          <img src={delImg} alt="" className="fs_sw"/>
          {plusDate(schedule.decisionDate, 0)} {getTime(schedule.decisionDate)}
        </div>
        : (schedule.drafterEmail === member.email || member.rank === "LEADER" ?
        <div className="button_form" onClick={() => onCancel()}>
          <p>일정 취소하기</p>
        </div> : null)}
        <div className="atag link_form" onClick={() => moveToPage()}>
          일정 홈
        </div>
      </div>
    </div>
  );
}

export default ScheduleUpdate;
