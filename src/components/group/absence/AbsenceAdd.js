import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { addAbsence } from "../../../modules/absences";
import { expireToken } from "../../../modules/token";

function AbsenceAdd({ changeMode }) {
  const token = useSelector((state) => state.token);
  const dispatch = useDispatch();

  const { id } = useParams();

  const [title, setTitle] = useState("");
  const [reason, setReason] = useState("ANNUAL");
  const [sdate, setSdate] = useState("");
  const [edate, setEdate] = useState("");
  const [content, setContent] = useState("");

  const onReasonHandler = (event) => {
    setReason(event.target.value);
  };

  const onTitleHandler = (event) => {
    setTitle(event.target.value);
    onTitleValidation(event.target.value);
  };

  const onContentHandler = (event) => {
    setContent(event.target.value);
    onContentValidation(event.target.value);
  };

  const onSdateHandler = (event) => {
    setSdate(event.target.value);
    onSdateValidation(event.target.value);
    if(event.target.value > edate) {
      setDatev(false);
    } else {
      setDatev(true);
    }
  };

  const onEdateHandler = (event) => {
    setEdate(event.target.value);
    onEdateValidation(event.target.value);
    if(sdate > event.target.value) {
      setDatev(false);
    } else {
      setDatev(true);
    }
  };

  const [titlev, setTitlev] = useState(true);
  const [datev, setDatev] = useState(true);
  const [sdatev, setSdatev] = useState(true);
  const [edatev, setEdatev] = useState(true);
  const [contentv, setContentv] = useState(true);

  const onTitleValidation = (val) => {
    var regExp = /^[가-힣|a-z|A-Z|0-9\s]{3,20}$/;
    setTitlev(regExp.test(val));
  };

  const onContentValidation = (val) => {
    var regExp = /^[가-힣|a-z|A-Z|0-9\s]{0,500}$/;
    setContentv(regExp.test(val));
  };

  const onSdateValidation = (val) => {
    var regExp = /\d{4}-\d{2}-\d{2}/;
    setSdatev(regExp.test(val));
  };

  const onEdateValidation = (val) => {
    var regExp = /\d{4}-\d{2}-\d{2}/;
    setEdatev(regExp.test(val));
  };

  const processing = async (token, groupId, data) => {
    const result = await dispatch(addAbsence(token, groupId, data));
    if(result.status === 201) {
      alert("등록되었습니다");
      changeMode(1);
    } else if (result.status === 401) {
      dispatch(expireToken());
    } else {
      alert("ERROR: absence add");
    }
  }

  const onSummit = () => {
    if (sdate === "" || edate === "" || title.length === 0) {
      onTitleValidation(title);
      onSdateValidation(sdate);
      onEdateValidation(edate);
      onContentValidation(content);
    } else if (sdate > edate) {
      setDatev(false);
    } else if (sdatev && edatev && titlev && contentv && datev) {
      const data = {
        title : title,
        content : content,
        reason : reason,
        startDate : sdate,
        endDate : edate
      }
      processing(token, id, data);
    } else {
      alert("입력값을 확인해주세요");
    }
  };

  return (
    <div className="container noblur">
      <div className="container_title">
        <h3>휴가 신청</h3>
        <input
          className="input_form"
          type="text"
          placeholder="제목"
          maxLength="20"
          value={title}
          onChange={onTitleHandler}
        />
        <p className={titlev ? "none" : "errort"}>
          한글, 영문, 숫자 조합 3 ~ 20자 이내
        </p>
        <select className="select_form" onChange={onReasonHandler}>
          <option value="ANNUAL">연가</option>
          <option value="OFFICIAL">공가</option>
          <option value="PETITION">청원</option>
          <option value="BUSINESS">출장</option>
          <option value="DISPATCH">파견</option>
          <option value="EDUCATION">교육</option>
          <option value="ETC_REASON">기타</option>
        </select>
        <div className="date_time_box">
          <input
            className="date_time"
            onChange={onSdateHandler}
            value={sdate}
            type="date"
          />
          <input
            className="date_time"
            onChange={onEdateHandler}
            value={edate}
            type="date"
          />
        </div>
        <p className={sdatev ? "none" : "errort"}>
          시작일자는 필수 입력 값 입니다.
        </p>
        <p className={edatev ? "none" : "errort"}>
          종료일자는 필수 입력 값 입니다.
        </p>
        <p className={datev ? "none" : "errort"}>
          종료일자는 시작일자보다 커야합니다
        </p>
        <textarea
          className="textarea_form"
          placeholder="내용"
          maxLength="500"
          value={content}
          onChange={onContentHandler}
        />
        <p className={contentv ? "none" : "errort"}>
          한글, 영문, 숫자 조합 500자 이내
        </p>
        <div className="button_form" onClick={() => onSummit()}>
          <p>신청하기</p>
        </div>
        <div className="atag link_form" onClick={() => changeMode(1)}>
          휴가 홈
        </div>
      </div>
    </div>
  );
}

export default AbsenceAdd;
