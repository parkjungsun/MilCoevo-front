import React from "react";
import { Link } from "react-router-dom";

import setImg from "../../../image/setting.png";

function Member() {
  return (
    <Link to="/group" className="atag member_block">
      <div className="member_block_info">
        <div className="member_info m_sb">
          <p className="member_group_name">정보체계관리단 개발과</p>
          <Link to="/member/update">
            <img className="info_img_s" src={setImg} alt="setImg" />
          </Link>
        </div>
        <div className="member_info">
          <p className="member_id theme_highlight">26명 참여중</p>
          <p className="member_id">|</p>
          <p className="member_id">팀원</p>
          <p className="member_id">AI기술개발장교</p>
          <p className="member_id">박정선</p>
        </div>
      </div>
    </Link>
  );
}

export default Member;
