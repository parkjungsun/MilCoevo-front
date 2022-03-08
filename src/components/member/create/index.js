import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, Navigate } from "react-router-dom";
import { createGroup } from "../../../modules/group";
import { expireToken } from "../../../modules/token";
import Header from "../../common/header";

function Create() {
  const token = useSelector((state) => state.token);
  const dispatch = useDispatch();

  const [step, setStep] = useState(1);
  const [process, setProcess] = useState(false);

  const [groupname, setGroupname] = useState("");
  const [position, setPosition] = useState("");
  const [nickname, setNickname] = useState("");

  const onGroupnameHandler = (event) => {
    setGroupname(event.currentTarget.value);
    onGroupnameValidation(event.currentTarget.value);
  };

  const onPositionHandler = (event) => {
    setPosition(event.currentTarget.value);
    onPositionValidation(event.currentTarget.value);
  };

  const onNicknameHandler = (event) => {
    setNickname(event.currentTarget.value);
    onNicknameValidation(event.currentTarget.value);
  };

  const [groupnamev, setGroupnamev] = useState(true);
  const [positionv, setPositionv] = useState(true);
  const [nicknamev, setNicknamev] = useState(true);

  const onGroupnameValidation = (val) => {
    var regExp = /^[가-힣|a-z|A-Z|0-9\s]{3,20}$/;
    setGroupnamev(regExp.test(val));
  };

  const onPositionValidation = (val) => {
    var regExp = /^[가-힣|a-z|A-Z|0-9\s]{3,20}$/;
    setPositionv(regExp.test(val));
  };

  const onNicknameValidation = (val) => {
    var regExp = /^[가-힣|a-z|A-Z|0-9\s]{3,10}$/;
    setNicknamev(regExp.test(val));
  };

  const stepCheck = () => {
    if(groupname.length === 0) {
      onGroupnameValidation(groupname);
    } else if (groupnamev) {
      setStep(2);
    } else {
      alert('입력값을 확인해주세요');
    }
  }

  const processing = async (token, data) => {
    const result = await dispatch(createGroup(token, data));
    if(result.status === 201 || result.status === 204) {
      setProcess(result.data);
    } else if (result.status === 401) {
      dispatch(expireToken());
    }
  }

  const onSummit = () => {
    if(position.length === 0 || nickname.length === 0) {
      onPositionValidation(position);
      onNicknameValidation(nickname);
    } else if (positionv && nicknamev) {
      const data = {
        groupName : groupname,
        position : position,
        nickname : nickname
      };
      processing(token, data);
    } else {
      alert("입력값을 확인해주세요");
    }
  }

  if(process) {
    return (<Navigate to="/members" /> );
  } 
  if (step === 1) {
    return (
      <>
        <Header />
        <div className="container noblur mt">
          <div className="container_title abl">
            <h3>새 그룹 생성</h3>
          </div>
          <input
            className="input_form"
            type="text"
            placeholder="그룹 명"
            maxLength="20"
            value={groupname}
            onChange={onGroupnameHandler}
          />
          <p className={groupnamev ? "none" : "error"}>
            한글, 영문, 숫자 조합 3 ~ 20자
          </p>
          <div className="button_form" onClick={() => stepCheck()}>
            <p>계속</p>
          </div>
          <button onClick={() => window.location.replace("/members")} className="atag link_form">
            뒤로가기
          </button>
        </div>
      </>
    );
  } else {
    return (
      <>
        <Header />
        <div className="container noblur mt">
          <div className="container_title abr">
            <h3>새 그룹 생성</h3>
            <p>{groupname}</p>
          </div>
          <input
            className="input_form"
            type="text"
            placeholder="업무 및 직책"
            maxLength="20"
            value={position}
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
            value={nickname}
            onChange={onNicknameHandler}
          />
          <p className={nicknamev ? "none" : "error"}>
            한글, 영문, 숫자 조합 3 ~ 10자
          </p>
          <div className="button_form" onClick={() => onSummit()}>
            <p>생성하기</p>
          </div>
          <div className="atag link_form" onClick={() => setStep(1)}>
            뒤로가기
          </div>
        </div>
      </>
    );    
  }
}

export default Create;
