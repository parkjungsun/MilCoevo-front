import React from "react";
import { Link } from "react-router-dom";
import Member from "./Member";

function MemberList({ members }) {
    if (!members || Object.keys(members).length === 0) {
      return <>
        <div className="no_content">
          <p>가입된 그룹이 없습니다</p>
          <button onClick={() => window.location.replace("/group/register")} className="atag theme_highlight">
              새 그룹 가입하기
          </button>
        </div>
      </>;
    } else {
      return <>
          {members.map((member, index) => (
            <Member key={index} member={member}/>
          ))} 
        </>;
    }
}

export default MemberList;