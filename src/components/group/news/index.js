import React, { useState } from "react";
import KeywordBlock from "./KeywordBlock";
import NewsBlock from "./NewsBlock";
import ToolBox from "./ToolBox";

function News() {
  const [mode, setMode] = useState(1);

  const changeMode = (mod) => {
    setMode(mod);
  };

  if (mode === 1) {
    return (
      <div className="info_container">
        <div className="search_box">
          <div className="search_condition">
            <p>검색 키워드</p>
            <div className="keyword_box">#국방부</div>
            <div className="keyword_box">#육군</div>
            <div className="keyword_box">#군대</div>
          </div>
          <div className="search_condition">
            <select className="search_select">
              <option value="0900">2022.03.05 09:00</option>
              <option value="0930">2022.03.05 09:30</option>
              <option value="1000">2022.03.05 10:00</option>
            </select>
          </div>
        </div>
        <NewsBlock />
        <NewsBlock />
        <div className="more_news">
          <p className="theme_highlight2">더보기</p>
        </div>
        <ToolBox changeMode={changeMode} />
      </div>
    );
  }
  if (mode === 2) {
    return <div className="container noblur">
      <div className="container_title abl">
          <h3>키워드 관리</h3>
      </div>
      <KeywordBlock />
      <div className="straight_line" />
      <input className="input_form" placeholder="새 키워드" />
      <div className="button_form">
        <p>키워드 추가</p>
      </div>
      <div className="atag link_form" onClick={() => changeMode(1)}>
        뉴스 홈
      </div>
    </div>;
  }
}

export default News;