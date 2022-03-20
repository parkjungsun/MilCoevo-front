import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import KeywordBlock from "./KeywordBlock";
import NewsBlock from "./NewsBlock";
import ToolBox from "./ToolBox";

import { useParams } from "react-router-dom";
import {
  addKeyword,
  clearKeywords,
  getKeywords,
} from "../../../modules/keywords";
import { clearNews, getNews } from "../../../modules/news";
import { termDate } from "../../../utils/dateUtil";

function News() {
  const dispatch = useDispatch();

  const [mode, setMode] = useState(1);
  const [word, setWord] = useState("");

  const { id } = useParams();
  const token = useSelector((state) => state.token);
  const keywords = useSelector((state) => state.keywords);
  const news = useSelector((state) => state.news);

  const onWordHandler = (event) => {
    setWord(event.currentTarget.value);
    onWordValidation(event.currentTarget.value);
  };

  const timeIndexHandler = async (e) => {
    dispatch(clearNews());
    dispatch(getNews(token, id, 0, e.target.value));
  };

  const [wordv, setWordv] = useState(true);

  const onWordValidation = (val) => {
    var regExp = /^[가-힣|a-z|A-Z|0-9\s]{1,10}$/;
    setWordv(regExp.test(val));
  };

  const onAddKeyword = () => {
    if (word.length === 0) {
      onWordValidation(word);
    } else if (wordv) {
      dispatch(addKeyword(token, id, { keyword: word }));
      setWord("");
    } else {
      alert("입력값을 확인해주세요");
    }
  };

  const moreNews = () => {
    dispatch(getNews(token, id, news.index, news.timeIndex ));
  };

  useEffect(() => {
    if (token !== "" && token !== "NONE") {
      dispatch(getKeywords(token, id));
      dispatch(getNews(token, id, news.index, ""));
    }
    return () => {
      dispatch(clearKeywords());
      dispatch(clearNews());
    };
  }, [token, dispatch]);

  const changeMode = (mod) => {
    setMode(mod);
    setWord("");
    setWordv(true);
    if (mod === 1) {
      dispatch(getNews(token, id, 0, ""));
    } else {
      dispatch(clearNews());
    }
  };

  if (mode === 1) {
    return (
      <div className="info_container">
        <div className="search_box">
          <div className="search_condition">
            <p>검색 키워드</p>
            {keywords.map((keyword, index) => (
              <div key={index} className="keyword_box">
                #{keyword.content}
              </div>
            ))}
            {Object.keys(keywords).length === 0 ? (
              <div className="ml">(등록된 키워드가 없습니다)</div>
            ) : null}
          </div>
          <div className="search_condition">
            <select className="search_select" onChange={timeIndexHandler}>
              <option value="">전체 시간</option>
              {termDate()}
            </select>
          </div>
        </div>
        {news.data.map((item, index) => (
          <NewsBlock
            key={index}
            title={item.title}
            imageLink={item.imageLink}
            link={item.link}
            keyword={item.keyword}
            pubDate={item.pubDate}
          />
        ))}
        {Object.keys(news.data).length === 0 ? (
          <div className="ment">등록된 키워드 뉴스가 <br /> 30분마다 업데이트 됩니다</div>
        ) :
        <div className="more_news" onClick={() => moreNews()}>
          <p className="theme_highlight2">더보기</p>
        </div>}
        <ToolBox changeMode={changeMode} />
      </div>
    );
  }
  if (mode === 2) {
    return (
      <div className="container noblur">
        <div className="container_title abl">
          <h3>키워드 관리</h3>
        </div>
        {keywords.map((keyword, index) => (
          <KeywordBlock
            key={index}
            content={keyword.content}
            delKey={keyword.id}
          />
        ))}
        <div className="straight_line" />
        <input
          className="input_form"
          type="text"
          placeholder="새 키워드"
          maxLength="10"
          value={word}
          onChange={onWordHandler}
        />
        <p className={wordv ? "none" : "error"}>
          한글, 영문, 숫자 조합 1 ~ 10자
        </p>
        <div className="button_form" onClick={() => onAddKeyword()}>
          <p>키워드 추가</p>
        </div>
        <div className="atag link_form" onClick={() => changeMode(1)}>
          뉴스 홈
        </div>
      </div>
    );
  }
}

export default News;
