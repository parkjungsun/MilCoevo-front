import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getTime, plusDate, plusDay } from "../../../utils/dateUtil";
import peopleImg from "../../../image/people.png";
import penImg from "../../../image/peng.png";
import delImg from "../../../image/delbox.png";
import {
  clearAbsence,
  getAbsence,
  updateAbsence,
} from "../../../modules/absence";

function AbsenceUpdate({ changeMode, changePage, page }) {
  const dispatch = useDispatch();

  const { id } = useParams();
  const token = useSelector((state) => state.token);
  const absence = useSelector((state) => state.absence);
  const member = useSelector((state) => state.member);

  const moveToPage = () => {
    changePage(null);
    changeMode(1);
  };

  const onCancel = () => {
    if(window.confirm("취소 하시겠습니까?")) {
      dispatch(updateAbsence(token, id, page, { processStatus: "WITHDRAW" }));
    }
  };

  const renderReason = (reason) => {
    switch (reason) {
      case "ANNUAL":
        return "연가";
      case "OFFICIAL":
        return "공가";
      case "PETITION":
        return "청원";
      case "BUSINESS":
        return "출장";
      case "DISPATCH":
        return "파견";
      case "EDUCATION":
        return "교육";
      case "ETC_REASON":
        return "기타";
      default:
        return "";
    }
  };

  useEffect(() => {
    if (page !== null) {
      dispatch(getAbsence(token, id, page));
    }
    return () => {
      dispatch(clearAbsence());
    };
  }, [token, id, page, dispatch]);

  return (
    <div className="container noblur">
      <div className="container_title">
        <h3>휴가 상세</h3>
        <div className="input_form bg">{absence.title}</div>
        <div className="input_form bg">{renderReason(absence.reason)}</div>
        <div className="date_time_box">
          <div className="input_form w_s_dt bg">
            {plusDate(absence.startDate, 0)}.{plusDay(absence.startDate, 0)}
          </div>
          <div className="input_form w_s_dt bg">
            {plusDate(absence.endDate, 0)}.{plusDay(absence.endDate, 0)}
          </div>
        </div>
        <textarea className="textarea_form bg" value={absence.content} readOnly disabled/>
        <div className="input_form h_dl bg">
          <img src={peopleImg} alt="" className="fs_sw" />
          {absence.drafterPosition} {absence.drafterNickname}
          <br />
          <img src={penImg} alt="" className="fs_sw" />
          {plusDate(absence.createdDate, 0)} {getTime(absence.createdDate)}
        </div>
        {absence.arbiterEmail !== null ? (
          <div className="input_form h_dl bg">
            <img src={peopleImg} alt="" className="fs_sw" />
            {absence.arbiterPosition} {absence.arbiterNickname}
            <br />
            <img src={delImg} alt="" className="fs_sw" />
            {plusDate(absence.decisionDate, 0)} {getTime(absence.decisionDate)}
          </div>
        ) : absence.drafterEmail === member.email ||
          member.rank === "LEADER" ? (
          <div className="button_form" onClick={() => onCancel()}>
            <p>휴가 취소하기</p>
          </div>
        ) : null}
        <div className="atag link_form" onClick={() => moveToPage()}>
          휴가 홈
        </div>
      </div>
    </div>
  );
}

export default AbsenceUpdate;
