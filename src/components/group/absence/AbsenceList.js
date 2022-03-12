import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { clearAbsences, getAbsences } from "../../../modules/absences";
import {
  frontYMD,
  isBetDay,
  nextDate,
  plusDate,
  plusDay,
  prevDate,
  rearYMD,
} from "../../../utils/dateUtil";
import AbsenceBox from "./AbsenceBox";
import ToolBox from "./ToolBox";

function AbsenceList({
  changeMode,
  changePage,
  setNow,
  now,
  process,
  setProcess,
}) {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.token);
  const absences = useSelector((state) => state.absences);

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
    dispatch(clearAbsences());
    dispatch(getAbsences(token, id, search));
  };

  const getMore = () => {
    const search = {
      index: absences.index,
      frontDate: frontYMD(now),
      rearDate: rearYMD(now),
      processStatus: process,
    };
    dispatch(getAbsences(token, id, search));
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
    dispatch(clearAbsences());
    dispatch(getAbsences(token, id, search));
  };

  const processHandler = async (e) => {
    const search = {
      index: 0,
      frontDate: frontYMD(now),
      rearDate: rearYMD(now),
      processStatus: e.target.value,
    };

    setProcess(e.target.value);
    dispatch(clearAbsences());
    dispatch(getAbsences(token, id, search));
  };

  useEffect(() => {
    const search = {
      index: 0,
      frontDate: frontYMD(now),
      rearDate: rearYMD(now),
      processStatus: process,
    };
    dispatch(getAbsences(token, id, search));
    return () => {
      dispatch(clearAbsences());
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
            <option value="SUGGESTED">반영된 휴가</option>
            <option value="WITHDRAW">취소된 휴가</option>
          </select>
        </div>
      </div>

      {absences.data.length === 0 ? (
        <div className="ment">등록된 휴가가 없습니다</div>
      ) : null}
      {[0, 1, 2, 3, 4, 5, 6].map((dateIndex) => {
        return (
          <>
            <div
              key={dateIndex}
              className={
                absences.data.filter(
                  (s) =>
                    isBetDay(now, dateIndex, new Date(s.startDate), new Date(s.endDate))
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
                  absences.data.filter(
                    (s) =>
                    isBetDay(now, dateIndex, new Date(s.startDate), new Date(s.endDate))
                  ).length
                }
                건
              </span>
            </div>
            {absences.data
              .filter(
                (s) =>
                isBetDay(now, dateIndex, new Date(s.startDate), new Date(s.endDate))
              )
              .map((data, index) => (
                <AbsenceBox
                  reason={data.reason}
                  title={data.title}
                  position={data.drafterPosition}
                  nickname={data.drafterNickname}
                  processStatus={data.processStatus}
                  absenceId={data.id}
                  key={index}
                  changeMode={changeMode}
                  changePage={changePage}
                />
              ))}
          </>
        );
      })}
      {Object.keys(absences.data).length % 30 !== 0 ||
      Object.keys(absences.data).length === 0 ? null : (
        <div className="more_news more_it" onClick={() => getMore()}>
          <p className="theme_highlight2">더보기</p>
        </div>
      )}

      <ToolBox changeMode={changeMode} />
    </div>
  );
}

export default AbsenceList;
