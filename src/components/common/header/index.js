import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, Navigate } from "react-router-dom";

import { checkToken, deleteToken } from "../../../modules/token";

import exitImg from "../../../image/exit.png";
import peopleImg from "../../../image/people.png";

function Header() {
  const dispatch = useDispatch();

  const token = useSelector((state) => state.token);

  useEffect(() => {
    if(token === "NONE") {
      dispatch(checkToken());
    }
  }, [token, dispatch]);

  if (token === "NONE") {
    return <div>...Loading</div>;
  }

  if(token === "") {
    return <Navigate to = "/login" />;
  }

  return (

    <div className="header">
    <div className="header_logo">
    <p>MILINEWS</p>
    </div>
    <div className="header_info">
    <div className="header_info_group">
    <p>정보체계관리단 개발과</p>
    </div>
        <Link to="/members" className="atag header_info_block">
        <img className="info_img_s" src={peopleImg} alt="peopleImg" />
        </Link>
        <div className="header_info_block" onClick={() => dispatch(deleteToken())}>
        <img className="info_img" src={exitImg} alt="exitImg" />
        </div>
        </div>
        </div>
        );
}

export default Header;
