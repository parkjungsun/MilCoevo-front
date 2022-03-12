import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { addPurchase } from "../../../modules/purchases";
import { expireToken } from "../../../modules/token";
import Item from "./Item";

function PurchaseAdd({ changeMode }) {
  const token = useSelector((state) => state.token);
  const dispatch = useDispatch();

  const { id } = useParams();
  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");
  const [purpose, setPurpose] = useState("OFFICE");
  const [content, setContent] = useState("");
  const [item, setItem] = useState([]);

  const [itemname, setItemname] = useState("");
  const [quantity, setQuantity] = useState("");
  const [price, setPrice] = useState("");

  const onItemnameHandler = (event) => {
    setItemname(event.target.value);
    onItemnameValidation(event.target.value);
  };

  const onQuantityHandler = (event) => {
    setQuantity(event.target.value.replace(/[^0-9]/g, ""));
    onQuantityValidation(event.target.value.replace(/[^0-9]/g, ""));
  };

  const onPriceHandler = (event) => {
    setPrice(event.target.value.replace(/[^0-9]/g, ""));
    onPriceValidation(event.target.value.replace(/[^0-9]/g, ""));
  };

  const onTitleHandler = (event) => {
    setTitle(event.target.value);
    onTitleValidation(event.target.value);
  };

  const onContentHandler = (event) => {
    setContent(event.target.value);
    onContentValidation(event.target.value);
  };

  const onDateHandler = (event) => {
    setDate(event.target.value);
    onDateValidation(event.target.value);
  };

  const onPurposeHandler = (event) => {
    setPurpose(event.target.value);
  };

  const [titlev, setTitlev] = useState(true);
  const [datev, setDatev] = useState(true);
  const [contentv, setContentv] = useState(true);

  const [itemnamev, setItemnamev] = useState(true);
  const [quantityv, setQuantityv] = useState(true);
  const [pricev, setPricev] = useState(true);

  const onItemnameValidation = (val) => {
    var regExp = /^[가-힣|a-z|A-Z|0-9\s]{1,10}$/;
    setItemnamev(regExp.test(val));
  };

  const onQuantityValidation = (val) => {
    var regExp = /^[0-9\s]{1,10}$/;
    setQuantityv(regExp.test(val));
  };

  const onPriceValidation = (val) => {
    var regExp = /^[0-9\s]{1,10}$/;
    setPricev(regExp.test(val));
  };

  const onTitleValidation = (val) => {
    var regExp = /^[가-힣|a-z|A-Z|0-9\s]{3,20}$/;
    setTitlev(regExp.test(val));
  };

  const onContentValidation = (val) => {
    var regExp = /^[가-힣|a-z|A-Z|0-9\s]{0,500}$/;
    setContentv(regExp.test(val));
  };

  const onDateValidation = (val) => {
    var regExp = /\d{4}-\d{2}-\d{2}/;
    setDatev(regExp.test(val));
  };

  const addItemBox = () => {
    if (itemname === "" || price === "" || quantity === "") {
      onItemnameValidation(itemname);
      onPriceValidation(price);
      onQuantityValidation(quantity);
    } else if (item.filter(i => i.itemName === itemname).length !== 0) {
      alert("이미 등록된 상품입니다");
    } else if (itemnamev && pricev && quantityv) {
      const data = {
        itemName: itemname,
        price: price,
        quantity: quantity,
      };
      setItem(item.concat(data));
      setItemname("");
      setPrice("");
      setQuantity("");
    } else {
      alert("입력값을 확인해주세요");
    }
  };

  const removeItemBox = (it) => {
    setItem(item.filter(i => i.itemName !== it.itemName));
  };

  const processing = async (token, groupId, data) => {
    const result = await dispatch(addPurchase(token, groupId, data));
    if(result.status === 201) {
      alert("등록되었습니다");
      changeMode(1);
    } else if (result.status === 401) {
      dispatch(expireToken());
    } else {
      alert("ERROR: schedule add");
    }
  }

  const onSummit = () => {
    if (date === "" || title.length === 0) {
      onTitleValidation(title);
      onDateValidation(date);
      onContentValidation(content);
    } else if (item.length === 0) {
      alert("등록된 상품이 없습니다");
    } else if (titlev && datev && contentv) {
        const data = {
            title: title,
            content: content,
            purpose: purpose,
            purchaseDate: date,
            items: item
        }
        processing(token, id, data);
    } else {
      alert("입력값을 확인해주세요");
    }
  };

  return (
    <div className="container noblur">
      <div className="container_title">
        <h3>지출 등록</h3>
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
        <div className="date_time_box">
          <select className="in_select_form" onChange={onPurposeHandler}>
            <option value="OFFICE">사무용품</option>
            <option value="LECTURE">교육비</option>
            <option value="TRAVEL">출장비</option>
            <option value="ETC_PURPOSE">기타</option>
          </select>
          <input
            className="date_time"
            onChange={onDateHandler}
            value={date}
            type="date"
          />
        </div>
        <p className={datev ? "none" : "errort"}>
          지출일자는 필수 입력 값 입니다.
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
          {item.length === 0 ? (
            <div className="pur_text tex_cen">-</div>
          ) : (
            item.map((i, index) => (
              <Item
                key={index}
                iname={i.itemName}
                iprice={i.price}
                iquantity={i.quantity}
                removeItemBox={removeItemBox}
                mode={true}
              />
            ))
          )}
          <div className="flex_sb m_sb">
            <span className="pur_text">총 지출액</span>
            <span className="pur_text">
              {(
                item.reduce((sum, i) => {
                  return sum + i.price * i.quantity;
                }, 0) + ""
              ).replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",")} 원
            </span>
          </div>
        </div>

        <div className="purchase_boxs">
          <div>
            <div className="purchase_box">
              <input
                maxLength="10"
                onChange={onItemnameHandler}
                value={itemname}
                className="pur_box pf"
                placeholder="상품 명"
              />
            </div>
            <div className="purchase_box ju">
              <div>
                <input
                  maxLength="5"
                  onChange={onQuantityHandler}
                  className="pur_box rf"
                  value={quantity}
                  placeholder="수량"
                />
              </div>
              <div>
                <input
                  maxLength="8"
                  onChange={onPriceHandler}
                  className="pur_box lf"
                  value={price}
                  placeholder="금액"
                />
              </div>
            </div>
          </div>
          <div className="purchase_add" onClick={() => addItemBox()}>
            추가
          </div>
        </div>

        <p className={itemnamev ? "none" : "errort"}>
          상품명은 10자 이하 영문, 숫자, 한글 조합입니다.
        </p>
        <p className={quantityv ? "none" : "errort"}>
          수량은 5자리 이하 숫자 입니다.
        </p>
        <p className={pricev ? "none" : "errort"}>
          가격은 8자리 이하 숫자 입니다.
        </p>

        <div className="button_form" onClick={() => onSummit()}>
          <p>등록하기</p>
        </div>
        <div className="atag link_form" onClick={() => changeMode(1)}>
          지출 홈
        </div>
      </div>
    </div>
  );
}

export default PurchaseAdd;
