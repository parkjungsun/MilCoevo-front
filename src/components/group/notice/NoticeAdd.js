import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { addNotice } from "../../../modules/notices";
import { expireToken } from "../../../modules/token";

function NoticeAdd({ changeMode }) {
  const token = useSelector((state) => state.token);
  const dispatch = useDispatch();

  const { id } = useParams();

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const onTitleHandler = (event) => {
    setTitle(event.target.value);
    onTitleValidation(event.target.value);
  };

  const onContentHandler = (event) => {
    setContent(event.target.value);
    onContentValidation(event.target.value);
  };

  const [titlev, setTitlev] = useState(true);
  const [contentv, setContentv] = useState(true);

  const onTitleValidation = (val) => {
    var regExp = /^[가-힣|a-z|A-Z|0-9\s]{3,20}$/;
    setTitlev(regExp.test(val));
  };

  const onContentValidation = (val) => {
    var regExp = /^[가-힣|a-z|A-Z|0-9\s]{0,500}$/;
    setContentv(regExp.test(val));
  };

  const processing = async (token, groupId, data) => {
    const result = await dispatch(addNotice(token, groupId, data));
    if(result.status === 201) {
      alert("등록되었습니다");
      changeMode(1);
    } else if (result.status === 401) {
      dispatch(expireToken());
    } else {
      alert("ERROR: notice add");
    }
  }

  const onSummit = () => {
    if(title.length === 0) {
        onTitleValidation(title);
        onContentValidation(content);
    } else if (titlev && contentv) {
      const data = {
        title: title,
        content: content
      }
      processing(token, id, data);
    } else {
      alert("입력값을 확인해주세요");
    }
  }

  return (
    <div className="container noblur">
      <div className="container_title">
        <h3>새 공지 등록</h3>
        <input
          className="input_form"
          type="text"
          placeholder="공지 명"
          maxLength="20"
          value={title}
          onChange={onTitleHandler}
        />
        <p className={titlev ? "none" : "errort"}>
          한글, 영문, 숫자 조합 3 ~ 20자 이내
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
          <p>등록하기</p>
        </div>
        <div className="atag link_form" onClick={() => changeMode(1)}>
          공지 홈
        </div>
      </div>
    </div>
  );
}

export default NoticeAdd;
