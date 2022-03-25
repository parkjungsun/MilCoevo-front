import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getTime, plusDate, plusDay } from "../../../utils/dateUtil";
import peopleImg from "../../../image/people.png";
import penImg from "../../../image/peng.png";
import delImg from "../../../image/delbox.png";
import {
  clearPurchase,
  getPurchase,
  updatePurchase,
} from "../../../modules/purchase";
import Item from "./Item";

function PurchaseUpdate({ changeMode, changePage, page }) {
  const dispatch = useDispatch();

  const { id } = useParams();

  const token = useSelector((state) => state.token);
  const purchase = useSelector((state) => state.purchase);
  const items = useSelector((state) => state.purchase.items);
  const member = useSelector((state) => state.member);

  const moveToPage = () => {
    changePage(null);
    changeMode(1);
  };

  const onCancel = () => {
    if(window.confirm("회수 하시겠습니까?")) {
      dispatch(updatePurchase(token, id, page, { processStatus: "WITHDRAW" }));
    }
  };

  const renderPurpose = (pur) => {
    switch (pur) {
      case "OFFICE":
        return "사무용품";
      case "LECTURE":
        return "교육비";
      case "TRAVEL":
        return "출장비";
      case "ETC_PURPOSE":
        return "기타";
      default:
        return "";
    }
  };

  useEffect(() => {
    if (page !== null) {
      dispatch(getPurchase(token, id, page));
    }
    return () => {
      dispatch(clearPurchase());
    };
  }, [token, id, page, dispatch]);

  return (
    <div className="container noblur">
      <div className="container_title">
        <h3>지출 상세</h3>
        <div className="input_form bg">{purchase.title}</div>
        <div className="date_time_box">
          <div className="input_form w_s_dt bg">
            {renderPurpose(purchase.purpose)}
          </div>
          <div className="input_form w_s_dt bg">
            {plusDate(purchase.purchaseDate, 0)}.
            {plusDay(purchase.purchaseDate, 0)}
          </div>
        </div>
        <textarea className="textarea_form bg" value={purchase.content} readOnly />

        <div className="pur_item_box">
          <div className="all_center bottom_dash">
            <div className="pur_one pur_text tex_lef">
              <span>상품 명</span>
            </div>
            <div className="pur_two pur_text tex_lef">
              <span>수량</span>
            </div>
            <div className="pur_three pur_text tex_lef">
              <span>금액</span>
            </div>
          </div>
          {items === undefined || items.length === 0 ? (
            <div className="pur_text tex_cen">-</div>
          ) : (
            items.map((i, index) => (
              <Item
                key={index}
                iname={i.itemName}
                iprice={i.price}
                iquantity={i.quantity}
                mode={false}
              />
            ))
          )}
          <div className="flex_sb m_sb">
            <span className="pur_text">총 지출액</span>
            <span className="pur_text">
              {items === undefined || items.length === 0 ? (
                <div className="pur_text tex_cen">-</div>
              ) : (
                (
                  items.reduce((sum, i) => {
                    return sum + i.price * i.quantity;
                  }, 0) + ""
                ).replace(/\B(?=(\d{3})+(?!\d))/g, ",")
              )}{" "}
              원
            </span>
          </div>
        </div>

        <div className="input_form h_dl bg bm">
          <img src={peopleImg} alt="" className="fs_sw" />
          {purchase.drafterPosition} {purchase.drafterNickname}
          <br />
          <img src={penImg} alt="" className="fs_sw" />
          {plusDate(purchase.createdDate, 0)} {getTime(purchase.createdDate)}
        </div>
        {purchase.arbiterEmail !== null ? (
          <div className="input_form h_dl bg">
            <img src={peopleImg} alt="" className="fs_sw" />
            {purchase.arbiterPosition} {purchase.arbiterNickname}
            <br />
            <img src={delImg} alt="" className="fs_sw" />
            {plusDate(purchase.decisionDate, 0)}{" "}
            {getTime(purchase.decisionDate)}
          </div>
        ) : purchase.drafterEmail === member.email ||
          member.rank === "LEADER" ? (
          <div className="button_form" onClick={() => onCancel()}>
            <p>지출 회수하기</p>
          </div>
        ) : null}
        <div className="atag link_form" onClick={() => moveToPage()}>
          지출 홈
        </div>
      </div>
    </div>
  );
}

export default PurchaseUpdate;
