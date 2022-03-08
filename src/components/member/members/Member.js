import React from "react";
import { Link } from "react-router-dom";

import setImg from "../../../image/setting.png";

function Member({ member }) {
  return (
    <div onClick={() => window.location.replace("/group/"+member.groupId)} className="atag member_block">
      <div className="member_block_info">
        <div className="member_info m_sb">
          <p className="member_group_name">{member.groupName}</p>
          <div onClick={() => window.location.replace("/member/"+member.groupId+"/info")}>
            <img className="info_img_s" src={setImg} alt="setImg" />
          </div>
        </div>
        <div className="member_info">
          <p className="member_id theme_highlight">|</p>
          <p className="member_id">{member.rank === "LEADER" ? "팀장" : "팀원"}</p>
          <p className="member_id">{member.position}</p>
          <p className="member_id">{member.nickname}</p>
        </div>
      </div>
    </div>
  );
}

export default Member;
