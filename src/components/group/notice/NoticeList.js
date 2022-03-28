import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { clearNotices, getNotices } from "../../../modules/notices";
import NoticeBox from "./NoticeBox";
import ToolBox from "./ToolBox";

import searchImg from "../../../image/search.png";

function NoticeList({ changeMode, changePage, stitle, setStitle }) {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.token);
  const notices = useSelector((state) => state.notices);
  const [tmp, setTmp] = useState(stitle);

  const { id } = useParams();

  const onSearchHandler = (event) => {
    setTmp(event.target.value.replace(/[^ㄱ-ㅎ|가-힣|a-z|A-Z|0-9\s]/g, ""));
  };

  const getMore = () => {
    const search = {
      index: notices.index,
      searchTitle: notices.searchTitle,
    };
    dispatch(getNotices(token, id, search));
  };

  const onSearch = () => {
//    const search = {
//      index: 0,
//      searchTitle: stitle,
//    };
//    dispatch(clearNotices());
//    dispatch(getNotices(token, id, search));
    setStitle(tmp);
  };

  useEffect(() => {
    const search = {
      index: 0,
      searchTitle: stitle,
    };
    dispatch(getNotices(token, id, search));
    return () => {
      dispatch(clearNotices());
    };
  }, [token, id, stitle, dispatch]);

  return (
    <div className="info_container">
      <div className="search_box ttt">
        <div className="search_condition ttt">
          <input
            className="search_form"
            type="text"
            placeholder="검색어를 입력하세요"
            maxLength="20"
            value={tmp}
            onChange={onSearchHandler}
          />
          <div className="search_img" onClick={() => onSearch()}>
            <img src={searchImg} alt=""  />
          </div>
        </div>
      </div>
      {notices.data.length === 0 ? (
        <div className="ment">등록된 공지가 없습니다</div>
      ) : (
        notices.data.map((i) => (
          <NoticeBox
            key={i.id}
            noticeId={i.id}
            title={i.title}
            date={i.createdDate}
            position={i.writerPosition}
            nickname={i.writerNickname}
            changeMode={changeMode}
            changePage={changePage}
          />
        ))
      )}
      {Object.keys(notices.data).length % 10 !== 0 ||
      Object.keys(notices.data).length === 0 ? null : (
        <div className="more_news more_it" onClick={() => getMore()}>
          <p className="theme_highlight2">더보기</p>
        </div>
      )}
      <ToolBox changeMode={changeMode} />
    </div>
  );
}

export default NoticeList;
