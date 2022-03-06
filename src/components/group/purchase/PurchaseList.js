import React from "react";
import PurchaseBox from "./PurchaseBox";
import ToolBox from "./ToolBox";

function PurchaseList({ changeMode }) {
  return (
    <div className="info_container">
      <div className="search_box">
        <div className="search_condition spbw">
          <div className="search_button">이전</div>
          <div className="search_duration">2022.03월</div>
          <div className="search_button">다음</div>
        </div>
        <div className="search_condition">
          <select className="search_select">
            <option value="">전체 예산</option>
            <option value="">반영된 예산</option>
            <option value="">취소된 예산</option>
          </select>
        </div>
      </div>
      <div className="static_box">
        <div className="static_unit">
          <p>총 사용금액</p>
          <p>400,000</p>
        </div>
        <div className="static_unit">
          <p>사무용품</p>
          <p>100,000</p>
        </div>
        <div className="static_unit">
          <p>교육비</p>
          <p>100,000</p>
        </div>
        <div className="static_unit">
          <p>출장비</p>
          <p>100,000</p>
        </div>
        <div className="static_unit">
          <p>기타</p>
          <p>100,000</p>
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
      <ToolBox changeMode={changeMode} />
    </div>
  );
}

export default PurchaseList;
