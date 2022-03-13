import React from "react";

import { useDispatch, useSelector } from "react-redux";
import { banGroupMember, updateGroupMember } from "../../../modules/manage";

function Groupmember({ groupId, memberId, email, nickname, position, rank, onSearch }) {
  const dispatch = useDispatch();

  const token = useSelector((state) => state.token);
  const member = useSelector((state) => state.member);

  const banMember = async () => {
    await dispatch(banGroupMember(token, groupId, memberId));
    onSearch();
  }

  const changeMember = async () => {
    await dispatch(updateGroupMember(token, groupId, memberId, { rank: "LEADER" }));
    onSearch();  
  }

  return (
    <>
      <div className="list_block hover_none">
        <div className="list_front list_content">
          <p>{rank === "LEADER" ? "관리자" : "사용자"}</p>
        </div>
        <div className="list_mid list_content ">
          <p>
            {position} {nickname}
            <br />
            <span className="pur_price">{email}</span>
          </p>
        </div>
        <div className="list_rear list_content">
          {rank === "LEADER" || member.rank === "MEMBER" || member.email === email ? null : (
            <div className="lrlc">
                <div className="lrlc_l" onClick={() => changeMember()}>
                    권한변경
                </div>
                <div className="lrlc_r" onClick={() => banMember()}>
                    내보내기
                </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default Groupmember;
