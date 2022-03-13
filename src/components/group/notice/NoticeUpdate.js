import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import peopleImg from "../../../image/people.png";
import penImg from "../../../image/peng.png";
import delImg from "../../../image/delbox.png";
import {
  addComment,
  clearNotice,
  delComment,
  delNotice,
  getNotice,
} from "../../../modules/notice";
import { getTime, plusDate } from "../../../utils/dateUtil";
import { expireToken } from "../../../modules/token";
import { getElementsByTagType } from "domutils";

function NoticeUpdate({ changeMode, changePage, page }) {
  const dispatch = useDispatch();

  const { id } = useParams();
  const token = useSelector((state) => state.token);
  const member = useSelector((state) => state.member);
  const notice = useSelector((state) => state.notice);
  const comments = useSelector((state) => state.notice.comments);

  const moveToPage = () => {
    changePage(null);
    changeMode(1);
  };

  const [content, setContent] = useState("");
  const [contentv, setContentv] = useState(true);

  const onDelete = async () => {
    if (window.confirm("삭제 하시겠습니까?")) {
      const result = await dispatch(delNotice(token, id, page));
      if(result.status === 200) {
        moveToPage();
      } else if(result.status === 401) {
        expireToken();
      } else {
        alert("ERROR: del Notice");
      }
    }
  };

  const onContentHandler = (event) => {
    setContent(event.target.value);
    onContentValidation(event.target.value);
  };

  const onContentValidation = (val) => {
    var regExp = /^[가-힣|a-z|A-Z|0-9\s]{1,500}$/;
    setContentv(regExp.test(val));
  };

  const processing = async (token, groupId, data) => {
    dispatch(addComment(token, groupId, page, data));
    setContent("");
  };

  const onAddComment = () => {
    if (content.length === 0) {
      onContentValidation(content);
    } else if (contentv) {
      const data = {
        comment: content,
        email: member.email,
        position: member.position,
        nickname: member.nickname,
      };
      processing(token, id, data);
    } else {
      alert("입력값을 확인해주세요");
    }
  };

  const onDelComment = (keyId) => {
    if (window.confirm("삭제 하시겠습니까?")) {
      dispatch(delComment(token, id, page, keyId));
    }
  };

  useEffect(() => {
    if (page !== null) {
      dispatch(getNotice(token, id, page));
    }
    return () => {
      dispatch(clearNotice());
    };
  }, [token, dispatch]);

  return (
    <div className="container noblur">
      <div className="container_title">
        <h3>공지 상세</h3>
        <div className="input_form bg">{notice.title}</div>
        <textarea
          className="textarea_form bg"
          value={notice.content}
          readOnly
          disabled
        />
        <div className="input_form h_dl bg">
          <img src={peopleImg} alt="" className="fs_sw" />
          {notice.writerPosition} {notice.writerNickname}
          <br />
          <img src={penImg} alt="" className="fs_sw" />
          {plusDate(notice.createdDate, 0)} {getTime(notice.createdDate)}
        </div>
        <div className="straight_line" />
        {comments === undefined || comments.length === 0
          ? null
          : comments.map((item, index) => (
                <div className="comment_form" key={index}>
                  <img src={peopleImg} alt="" className="fs_sw" />
                  {item.position} {item.nickname}
                  {item.email === member.email ? (
                    <img
                      src={delImg}
                      alt=""
                      className="fs_sw mlb"
                      onClick={() => onDelComment(item.id)}
                    />
                  ) : null}
                  <br />
                  <textarea value={item.content} readOnly disabled />
                </div>
            ))}

        <div className="purchase_boxs">
          <textarea
            className="textarea_form2"
            placeholder="댓글"
            maxLength="500"
            value={content}
            onChange={onContentHandler}
          />
          <div className="purchase_add2" onClick={() => onAddComment()}>
            댓글
            <br />
            추가
          </div>
        </div>
        <p className={contentv ? "none" : "errort"}>
          댓글은 한글, 영문, 숫자 조합 500자 이내
        </p>

        <div className="atag link_form" onClick={() => moveToPage()}>
          공지 홈
        </div>
        {member.rank === "LEADER" ? (
          <div className="group_out" onClick={() => onDelete()}>
            <p>공지 삭제하기</p>
          </div>
        ) : null}
      </div>
    </div>
  );
}

export default NoticeUpdate;
