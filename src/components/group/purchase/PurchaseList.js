import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import purchase from "../../../modules/purchase";
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

    const search = {
      index: 0,
      frontDate: frontMonth(next),
      rearDate: rearMonth(next),
      processStatus: process,
    };
    dispatch(clearPurchases());
    dispatch(getPurchases(token, id, search));
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

    const search = {
      index: 0,
      frontDate: frontMonth(prev),
      rearDate: rearMonth(prev),
      processStatus: process,
    };
    dispatch(clearPurchases());
    dispatch(getPurchases(token, id, search));
  };

  const processHandler = async (e) => {
    const search = {
      index: 0,
      frontDate: frontMonth(now),
      rearDate: rearMonth(now),
      processStatus: e.target.value,
    };

    setProcess(e.target.value);
    dispatch(clearPurchases());
    dispatch(getPurchases(token, id, search));
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
  }, [token, dispatch]);

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
            value={process}>
            <option value="">반영된 지출</option>
            <option value="">취소된 지출</option>
          </select>
        </div>
      </div>
      <div className="static_box">
        <div className="static_unit">
          <p>총 지출</p>
          <p>{purchases.total ? (purchases.total + "").replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",") : 0}</p>
        </div>
        <div className="static_unit">
          <p>사무용품</p>
          <p>{purchases.office ? (purchases.office + "").replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",") : 0}</p>
        </div>
        <div className="static_unit">
          <p>교육비</p>
          <p>{purchases.lecture ? (purchases.lecture + "").replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",") : 0}</p>
        </div>
        <div className="static_unit">
          <p>출장비</p>
          <p>{purchases.travel ? (purchases.travel + "").replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",") : 0}</p>
        </div>
        <div className="static_unit">
          <p>기타</p>
          <p>{purchases.etc ? (purchases.etc + "").replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",") : 0}</p>
        </div>
      </div>


      <div className="list_date">
        <p>2022.03.07.</p>
        <span>2건</span>
      </div>
      <PurchaseBox />
      <PurchaseBox />
      <div className="list_date">
        <p>2022.03.07.</p>
        <span>2건</span>
      </div>
      <PurchaseBox />
      <PurchaseBox />

      {Object.keys(purchases.data).length % 30 !== 0 ||
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
