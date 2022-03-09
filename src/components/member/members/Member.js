import React from "react";
import { Link } from "react-router-dom";

import setImg from "../../../image/setting.png";

function Member({ member }) {
  return (
    <div className="member_block">
      <div className="member_block_info">
        <div className="member_info m_sb">
          <Link to={"/group/"+member.groupId} className="atag member_group_name">{member.groupName}</Link>
          <Link to={"/member/"+member.groupId+"/info"}>
            <img className="info_img_s" src={setImg} alt="setImg" />
          </Link>
        </div>
        <Link to={"/group/"+member.groupId}  className="atag member_info">
          <p className="member_id theme_highlight">|</p>
          <p className="member_id">{member.rank === "LEADER" ? "관리자" : "사용자"}</p>
          <p className="member_id">{member.position}</p>
          <p className="member_id">{member.nickname}</p>
        </Link>
      </div>
    </div>
  );
}

export default Member;
