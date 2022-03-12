import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { clearSchedules, getSchedules } from "../../../modules/schedules";
import {
  frontYMD,
  nextDate,
  plusDate,
  plusDay,
  prevDate,
  rearYMD,
} from "../../../utils/dateUtil";
import ScheduleBox from "./ScheduleBox";
import ToolBox from "./ToolBox";

function ScheduleList({
  changeMode,
  changePage,
  setNow,
  now,
  process,
  setProcess,
}) {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.token);
  const schedules = useSelector((state) => state.schedules);

  const { id } = useParams();

  const onNext = () => {
    let next = nextDate(now);
    setNow(next);

    const search = {
      index: 0,
      frontDate: frontYMD(next),
      rearDate: rearYMD(next),
      processStatus: process,
    };
    dispatch(clearSchedules());
    dispatch(getSchedules(token, id, search));
  };

  const getMore = () => {
    const search = {
      index: schedules.index,
      frontDate: frontYMD(now),
      rearDate: rearYMD(now),
      processStatus: process,
    };
    dispatch(getSchedules(token, id, search));
  };

  const onPrev = () => {
    let prev = prevDate(now);
    setNow(prev);

    const search = {
      index: 0,
      frontDate: frontYMD(prev),
      rearDate: rearYMD(prev),
      processStatus: process,
    };
    dispatch(clearSchedules());
    dispatch(getSchedules(token, id, search));
  };

  const processHandler = async (e) => {
    const search = {
      index: 0,
      frontDate: frontYMD(now),
      rearDate: rearYMD(now),
      processStatus: e.target.value,
    };

    setProcess(e.target.value);
    dispatch(clearSchedules());
    dispatch(getSchedules(token, id, search));
  };

  useEffect(() => {
    const search = {
      index: 0,
      frontDate: frontYMD(now),
      rearDate: rearYMD(now),
      processStatus: process,
    };
    dispatch(getSchedules(token, id, search));
    return () => {
      dispatch(clearSchedules());
    };
  }, [token, dispatch]);

  return (
    <div className="info_container">
      <div className="search_box">
        <div className="search_condition spbw">
          <div className="search_button" onClick={() => onPrev()}>
            이전
          </div>
          <div className="search_duration">
            {frontYMD(now).replaceAll("-", ".")}. ~
            {rearYMD(now).replaceAll("-", ".")}.
          </div>
          <div className="search_button" onClick={() => onNext()}>
            다음
          </div>
        </div>
        <div className="search_condition">
          <select
            className="search_select"
            onChange={processHandler}
            value={process}
          >
            <option value="SUGGESTED">반영된 일정</option>
            <option value="WITHDRAW">취소된 일정</option>
          </select>
        </div>
      </div>
      {schedules.data.length === 0 ? (
        <div className="ment">등록된 일정이 없습니다</div>
      ) : null}
      {[0, 1, 2, 3, 4, 5, 6].map((dateIndex) => {
        return (
          <>
            <div
              key={dateIndex}
              className={
                schedules.data.filter(
                  (s) =>
                    plusDate(new Date(s.workDate), 0) ===
                    plusDate(now, dateIndex)
                ).length === 0
                  ? "none"
                  : "list_date"
              }
            >
              <p className="flex_sb">
                {plusDate(now, dateIndex)}.{plusDay(now, dateIndex)}
              </p>
              <span>
                {
                  schedules.data.filter(
                    (s) =>
                      plusDate(new Date(s.workDate), 0) ===
                      plusDate(now, dateIndex)
                  ).length
                }
                건
              </span>
            </div>
            {schedules.data
              .filter(
                (s) =>
                  plusDate(new Date(s.workDate), 0) === plusDate(now, dateIndex)
              )
              .map((data) => (
                <ScheduleBox
                  workDate={data.workDate}
                  title={data.title}
                  position={data.drafterPosition}
                  nickname={data.drafterNickname}
                  processStatus={data.processStatus}
                  scheduleId={data.id}
                  key={data.id}
                  changeMode={changeMode}
                  changePage={changePage}
                />
              ))}
          </>
        );
      })}
      {Object.keys(schedules.data).length % 10 !== 0 ||
      Object.keys(schedules.data).length === 0 ? null : (
        <div className="more_news more_it" onClick={() => getMore()}>
          <p className="theme_highlight2">더보기</p>
        </div>
      )}
      <ToolBox changeMode={changeMode} />
    </div>
  );
}

export default ScheduleList;
