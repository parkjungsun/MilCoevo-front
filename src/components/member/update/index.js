import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { clearMem, exitMember, getMember } from "../../../modules/member";
import { Link, useParams } from "react-router-dom";
import Header from "../../common/header";
import { clearGroup, getGroup, updateGroupname, updateInviteCode } from "../../../modules/group";
import { updateMember } from "../../../modules/member";
import refreshImg from "../../../image/refresh.png";

function UpdateMember() {
  const dispatch = useDispatch();

  const { id } = useParams();
  const token = useSelector((state) => state.token);
  const member = useSelector((state) => state.member);
  const group = useSelector((state) => state.group);

  const [position, setPosition] = useState(member.position);
  const [nickname, setNickname] = useState(member.nickname);
  const [groupname, setGroupname] = useState(group.groupName);

  const onPositionHandler = (event) => {
    setPosition(event.currentTarget.value);
    onPositionValidation(event.currentTarget.value);
  };

  const onNicknameHandler = (event) => {
    setNickname(event.currentTarget.value);
    onNicknameValidation(event.currentTarget.value);
  };

  const onGroupnameHandler = (event) => {
    setGroupname(event.currentTarget.value);
    onGroupnameValidation(event.currentTarget.value);
  };

  const [positionv, setPositionv] = useState(true);
  const [nicknamev, setNicknamev] = useState(true);
  const [groupnamev, setGroupnamev] = useState(true);

  const onPositionValidation = (val) => {
    var regExp = /^[가-힣|a-z|A-Z|0-9\s]{3,20}$/;
    setPositionv(regExp.test(val));
  };

  const onNicknameValidation = (val) => {
    var regExp = /^[가-힣|a-z|A-Z|0-9\s]{3,10}$/;
    setNicknamev(regExp.test(val));
  };

  const onGroupnameValidation = (val) => {
    var regExp = /^[가-힣|a-z|A-Z|0-9\s]{3,20}$/;
    setGroupnamev(regExp.test(val));
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

  const chanageGroupname = (token, groupId, data) => {
    dispatch(updateGroupname(token, groupId, data));
  };

  const changeInvitecode = () => {
    dispatch(updateInviteCode(token, id));
  }

  const onChangeGroupname = () => {
    if (groupname.length === 0) {
      setGroupname(group.groupName);
    } else if (groupnamev) {
      const data = {
        groupName: groupname,
      };
      chanageGroupname(token, id, data);
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
  }, [token, id, dispatch]);

  if (member.email === "" && group.groupName === "") {
    return (
      <>
        <Header />
        <div className="container noblur">
          <Link to="/members" className="atag link_form">
            사용자 홈
          </Link>
        </div>
      </>
    );
  } else {
    return (
      <>
        <Header />
        <div className="container noblur">
          <div
            className={
              member.rank === "LEADER"
                ? "container_title abl"
                : "container_title abr"
            }
          >
            <h3>정보 수정</h3>
            <p className={member.rank === "LEADER" ? "none" : ""}>
              {group.groupName}
              <br />({group.inviteCode})
            </p>
          </div>
          <input
            className={member.rank === "LEADER" ? "input_form" : "none"}
            type="text"
            placeholder="그룹 명"
            maxLength="20"
            defaultValue={group.groupName}
            onChange={onGroupnameHandler}
          />
          <p className={groupnamev ? "none" : "error"}>
            한글, 영문, 숫자 조합 3 ~ 20자
          </p>
          <div className={member.rank === "LEADER" ? "input_form bg flex_sb refresh_img" : "none"}>
            <p>{group.inviteCode}</p>
            <img src={refreshImg} alt="refreshImg" onClick={() => changeInvitecode()}/>
          </div>
          <div
            className={member.rank === "LEADER" ? "button_form" : "none"}
            onClick={() => onChangeGroupname()}
          >
            <p>저장</p>
          </div>

          <div
            className={member.rank === "LEADER" ? "straight_line" : "none"}
          />

          <div className="input_form bg">
            <p>{member.email}</p>
          </div>
          <div className="input_form bg">
            <p>{member.rank === "LEADER" ? "관리자" : "사용자"}</p>
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
          <Link to="/members" className="atag link_form">
            사용자 홈
          </Link>
          <div className="group_out" onClick={() => exitGroup()}>
            <p>그룹 탈퇴</p>
          </div>
        </div>
      </>
    );
  }
}

export default UpdateMember;
