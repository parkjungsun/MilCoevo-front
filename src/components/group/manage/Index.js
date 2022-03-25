import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { clearGroupMember, getGroupMembers } from "../../../modules/manage";

import searchImg from "../../../image/search.png";
import Groupmember from "./Groupmember";

function ManageList() {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.token);
  const groupmember = useSelector((state) => state.groupmember);

  const { id } = useParams();
  const [stitle, setStitle] = useState(groupmember.searchName);

  const onSearchHandler = (event) => {
    setStitle(event.target.value.replace(/[^ㄱ-ㅎ|가-힣|a-z|A-Z|0-9\s]/g, ""));
  };

  const getMore = () => {
    const search = {
      index: groupmember.index,
      searchName: groupmember.searchName
    };
    dispatch(getGroupMembers(token, id, search));
  };

  const onSearch = () => {
    const search = {
        index: 0,
        searchName: stitle
    };
    dispatch(clearGroupMember());
    dispatch(getGroupMembers(token, id, search));
  };

  useEffect(() => {
    const search = {
        index: 0,
        searchName: ""
    };
    dispatch(getGroupMembers(token, id, search));
    return () => {
        dispatch(clearGroupMember());
    };
  }, [token, id, dispatch]);

  return (
    <div className="info_container">
      <div className="search_box ttt">
        <div className="search_condition ttt">
          <input
            className="search_form"
            type="text"
            placeholder="이름을 입력하세요"
            maxLength="20"
            value={stitle}
            onChange={onSearchHandler}
          />
          <div className="search_img" onClick={() => onSearch()}>
            <img src={searchImg} alt=""  />
          </div>
        </div>
      </div>
      {groupmember.data.length === 0 ? (
        <div className="ment">등록된 인원이 없습니다</div>
      ) : (
        groupmember.data.map((i) => <Groupmember 
            groupId = {i.groupId} 
            memberId = {i.id} 
            email = {i.email}
            nickname = {i.nickname} 
            position = {i.position} 
            rank = {i.rank}
            onSearch = {onSearch}
        />)
      )}
      {Object.keys(groupmember.data).length % 10 !== 0 ||
      Object.keys(groupmember.data).length === 0 ? null : (
        <div className="more_news more_it" onClick={() => getMore()}>
          <p className="theme_highlight2">더보기</p>
        </div>
      )}
    </div>
  );
}

export default ManageList;
