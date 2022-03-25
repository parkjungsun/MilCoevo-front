import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { clearPurchases, getPurchases } from "../../../modules/purchases";
import {
  frontMonth,
  nextMonth,
  plusDate,
  plusDay,
  prevMonth,
  rearMonth,
} from "../../../utils/dateUtil";
import PurchaseBox from "./PurchaseBox";
import ToolBox from "./ToolBox";

function PurchaseList({
  changeMode,
  changePage,
  now,
  setNow,
  process,
  setProcess,
}) {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.token);
  const purchases = useSelector((state) => state.purchases);

  const { id } = useParams();

  const onNext = () => {
    let next = nextMonth(now);
    setNow(next);

//    const search = {
//      index: 0,
//      frontDate: frontMonth(next),
//      rearDate: rearMonth(next),
//      processStatus: process,
//    };
//    dispatch(clearPurchases());
//    dispatch(getPurchases(token, id, search));
  };

  const getMore = () => {
    const search = {
      index: purchases.index,
      frontDate: frontMonth(now),
      rearDate: rearMonth(now),
      processStatus: process,
    };
    dispatch(getPurchases(token, id, search));
  };

  const onPrev = () => {
    let prev = prevMonth(now);
    setNow(prev);

//    const search = {
//      index: 0,
//      frontDate: frontMonth(prev),
//      rearDate: rearMonth(prev),
//      processStatus: process,
//    };
//    dispatch(clearPurchases());
//    dispatch(getPurchases(token, id, search));
  };

  const processHandler = async (e) => {
    //const search = {
    //  index: 0,
    //  frontDate: frontMonth(now),
    //  rearDate: rearMonth(now),
    //  processStatus: e.target.value,
    //};

    setProcess(e.target.value);
    //dispatch(clearPurchases());
    //dispatch(getPurchases(token, id, search));
  };

  useEffect(() => {
    const search = {
      index: 0,
      frontDate: frontMonth(now),
      rearDate: rearMonth(now),
      processStatus: process,
    };
    dispatch(getPurchases(token, id, search));
    return () => {
      dispatch(clearPurchases());
    };
  }, [token, id, now, process, dispatch]);

  return (
    <div className="info_container">
      <div className="search_box">
        <div className="search_condition spbw">
          <div className="search_button" onClick={() => onPrev()}>
            이전
          </div>
          <div className="search_duration">
            {frontMonth(now).replaceAll("-", ".")}. ~
            {rearMonth(now).replaceAll("-", ".")}.
          </div>
          <div className="search_button" onClick={() => onNext()}>
            다음
          </div>
        </div>
        <div className="search_condition">
          <select
            className="search_select"
            onChange={processHandler}
            defaultValue={process}
          >
            <option value="SUGGESTED">반영된 지출</option>
            <option value="WITHDRAW">취소된 지출</option>
          </select>
        </div>
      </div>
      <div className="static_box">
        <div className="static_unit full_unit">
          <p>총 지출</p>
          <p>
            {purchases.total
              ? (purchases.total + "").replace(
                  /\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g,
                  ","
                )
              : 0}원
          </p>
        </div>
        <div className="static_unit">
          <p>사무용품</p>
          <p>
            {purchases.office
              ? (purchases.office + "").replace(
                  /\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g,
                  ","
                )
              : 0}원
          </p>
        </div>
        <div className="static_unit">
          <p>교육비</p>
          <p>
            {purchases.lecture
              ? (purchases.lecture + "").replace(
                  /\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g,
                  ","
                )
              : 0}원
          </p>
        </div>
        <div className="static_unit">
          <p>출장비</p>
          <p>
            {purchases.travel
              ? (purchases.travel + "").replace(
                  /\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g,
                  ","
                )
              : 0}원
          </p>
        </div>
        <div className="static_unit">
          <p>기타</p>
          <p>
            {purchases.etc
              ? (purchases.etc + "").replace(
                  /\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g,
                  ","
                )
              : 0}원
          </p>
        </div>
      </div>
      {purchases.data.length === 0 ? (
        <div className="ment">등록된 지출이 없습니다</div>
      ) : null}
      {[
        31, 30, 29, 28, 27, 26, 25, 24, 23, 22, 21, 20, 19, 18, 17, 16, 15, 14,
        13, 12, 11, 10, 9, 8, 7, 6, 5, 4, 3, 2, 1, 0,
      ].map((dateIndex) => {
        return (
          <>
            <div
              key={dateIndex}
              className={
                purchases.data.filter(
                  (s) =>
                    plusDate(new Date(s.purchaseDate), 0) ===
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
                  purchases.data.filter(
                    (s) =>
                      plusDate(new Date(s.purchaseDate), 0) ===
                      plusDate(now, dateIndex)
                  ).length
                }
                건
              </span>
            </div>
            {purchases.data
              .filter(
                (s) =>
                  plusDate(new Date(s.purchaseDate), 0) === plusDate(now, dateIndex)
              )
              .map((data) => (
                <PurchaseBox
                  purchasePrice={data.purchasePrice}
                  purpose={data.purpose}
                  title={data.title}
                  position={data.drafterPosition}
                  nickname={data.drafterNickname}
                  processStatus={data.processStatus}
                  purchaseId={data.id}
                  key={data.id}
                  changeMode={changeMode}
                  changePage={changePage}
                />
              ))}
          </>
        );
      })}
      {Object.keys(purchases.data).length % 10 !== 0 ||
      Object.keys(purchases.data).length === 0 ? null : (
        <div className="more_news more_it" onClick={() => getMore()}>
          <p className="theme_highlight2">더보기</p>
        </div>
      )}
      <ToolBox changeMode={changeMode} />
    </div>
  );
}

export default PurchaseList;
