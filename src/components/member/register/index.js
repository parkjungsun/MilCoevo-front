import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, Navigate } from "react-router-dom";
import Header from "../../common/header";
import { clearGroup, confirmGroup } from "../../../modules/group";
import { registerGroup } from "../../../modules/group";
import { expireToken } from "../../../modules/token";

function Register() {
  const dispatch = useDispatch();

  const token = useSelector((state) => state.token);
  const group = useSelector((state) => state.group);
  
  const [step, setStep] = useState(1);
  const [process, setProcess] = useState(false);

  const [invitecode, setInvitecode] = useState("");
  const [position, setPosition] = useState("");
  const [nickname, setNickname] = useState("");

  const onInvitecodeHandler = (event) => {
    setInvitecode(event.currentTarget.value);
    onInvitecodeValidation(event.currentTarget.value);
  };

  const onPositionHandler = (event) => {
    setPosition(event.currentTarget.value);
    onPositionValidation(event.currentTarget.value);
  };

  const onNicknameHandler = (event) => {
    setNickname(event.currentTarget.value);
    onNicknameValidation(event.currentTarget.value);
  };

  const [invitecodev, setInvitecodev] = useState(true);
  const [positionv, setPositionv] = useState(true);
  const [nicknamev, setNicknamev] = useState(true);

  const onInvitecodeValidation = (val) => {
    var regExp = /^[a-z|A-Z|0-9\s]{10,15}$/;
    setInvitecodev(regExp.test(val));
  }

  const onPositionValidation = (val) => {
    var regExp = /^[가-힣|a-z|A-Z|0-9\s]{3,20}$/;
    setPositionv(regExp.test(val));
  };

  const onNicknameValidation = (val) => {
    var regExp = /^[가-힣|a-z|A-Z|0-9\s]{3,10}$/;
    setNicknamev(regExp.test(val));
  };

  const getGroup = async () => {
    if(invitecode.length === 0) {
      onInvitecodeValidation(invitecode);
    } else if (invitecodev) {
      await dispatch(confirmGroup(token, invitecode));
      setStep(2);
    } else {
      alert('입력값을 확인해주세요');
    }
  }

  const processing = async (token, data) => {
    const result = await dispatch(registerGroup(token, data));
    if(result.status === 200) {
      setProcess(true);
    } else if (result.status === 401) {
      dispatch(expireToken());
    }
  }

  const onSummit = () => {
    if (position.length === 0 || nickname.length === 0) {
      onPositionValidation(position);
      onNicknameValidation(nickname);
    } else if (positionv && nicknamev) {
      const data = {
        inviteCode: invitecode,
        position: position,
        nickname: nickname
      } 
      processing(token, data);
    }else {
      alert("입력값을 확인해주세요");
    }
  }

  useEffect(() => {
    return (() => {
      dispatch(clearGroup());
    });
  }, [token, dispatch]);

  if(process) {
    return (<Navigate to="/members" />)
  }
  if(step === 1) {
    return (
      <>
        <Header />
        <div className="container noblur mt">
          <div className="container_title abl">
            <h3>그룹 가입</h3>
          </div>
          <input
            className="input_form"
            type="text"
            placeholder="그룹 초대코드"
            maxLength="15"
            value={invitecode}
            onChange={onInvitecodeHandler}
          />
          <p className={invitecodev ? "none" : "error"}>
            영문, 숫자 조합 10 ~ 15자
          </p>
          <div className="button_form" onClick={() => getGroup()}>
            <p>계속</p>
          </div>
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
        <div className="container noblur mt">
          <div className="container_title abr">
            <h3>그룹 가입</h3>
            <p>{group.groupName}<br/>({group.inviteCode})</p>
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
            <p>가입하기</p>
          </div>
          <div className="atag link_form" onClick={() => setStep(1)}>
            뒤로가기
          </div>
        </div>
      </>
    );    
  }
}

export default Register;
