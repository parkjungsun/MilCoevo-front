import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { clearMem, exitMember, getMember } from "../../../modules/member";
import { Link, useParams } from "react-router-dom";
import Header from "../../common/header";
import { clearGroup, getGroup } from "../../../modules/group";
import { updateMember } from "../../../modules/member";

function UpdateMember() {
  const dispatch = useDispatch();

  const { id } = useParams();
  const token = useSelector((state) => state.token);
  const member = useSelector((state) => state.member);
  const group = useSelector((state) => state.group);

  const [position, setPosition] = useState(member.position);
  const [nickname, setNickname] = useState(member.nickname);

  const onPositionHandler = (event) => {
    setPosition(event.currentTarget.value);
    onPositionValidation(event.currentTarget.value);
  };

  const onNicknameHandler = (event) => {
    setNickname(event.currentTarget.value);
    onNicknameValidation(event.currentTarget.value);
  };

  const [positionv, setPositionv] = useState(true);
  const [nicknamev, setNicknamev] = useState(true);

  const onPositionValidation = (val) => {
    var regExp = /^[가-힣|a-z|A-Z|0-9\s]{3,20}$/;
    setPositionv(regExp.test(val));
  };

  const onNicknameValidation = (val) => {
    var regExp = /^[가-힣|a-z|A-Z|0-9\s]{3,10}$/;
    setNicknamev(regExp.test(val));
  };

  const processing = (token, groupId, data) => {
    dispatch(updateMember(token, groupId, data));
  };

  const onSummit = () => {
    if (position.length === 0 || nickname.length === 0) {
      setPosition(member.position);
      setNickname(member.nickname);
    } else if (positionv && nicknamev) {
      const data = {
        position: position,
        nickname: nickname,
      };
      processing(token, id, data);
    } else {
      alert("입력값을 확인해주세요");
    }
  };

  const exitGroup = () => {
    dispatch(exitMember(token, id));
  };

  useEffect(() => {
    if (token !== "" && token !== "NONE") {
      dispatch(getMember(token, id));
      dispatch(getGroup(token, id));
    }
    return () => {
      dispatch(clearMem());
      dispatch(clearGroup());
    };
  }, [token, dispatch]);

  if (member.email === "" && group.groupName === "") {
    return (
      <>
        <Header />
        <div className="container noblur">
          <button onClick={() => window.location.replace("/members")} className="atag link_form">
            사용자 홈
          </button>
        </div>
      </>
    );
  } else {
    return (
      <>
        <Header />
        <div className="container noblur">
          <div className="container_title abr">
            <h3>정보 수정</h3>
            <p>
              {group.groupName}
              <br />({group.inviteCode})
            </p>
          </div>
          <div className="input_form bg">
            <p>{member.email}</p>
          </div>
          <div className="input_form bg">
            <p>{member.rank === "LEADER" ? "팀장" : "팀원"}</p>
          </div>
          <input
            className="input_form"
            type="text"
            placeholder="업무 및 직책"
            maxLength="20"
            defaultValue={member.position}
            onChange={onPositionHandler}
          />
          <p className={positionv ? "none" : "error"}>
            한글, 영문, 숫자 조합 3 ~ 20자
          </p>
          <input
            className="input_form"
            type="text"
            placeholder="닉네임"
            maxLength="10"
            defaultValue={member.nickname}
            onChange={onNicknameHandler}
          />
          <p className={nicknamev ? "none" : "error"}>
            한글, 영문, 숫자 조합 3 ~ 10자
          </p>
          <div className="button_form" onClick={() => onSummit()}>
            <p>저장</p>
          </div>
          <button onClick={() => window.location.replace("/members")} className="atag link_form">
            사용자 홈
          </button>
          <div className="group_out" onClick={() => exitGroup()}>
            <p>그룹 탈퇴</p>
          </div>
        </div>
      </>
    );
  }
}

export default UpdateMember;
