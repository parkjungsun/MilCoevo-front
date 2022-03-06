import React from "react";
import { Link } from "react-router-dom";

import exitImg from "../../../image/exit.png";
import peopleImg from "../../../image/people.png";

function Header() {
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
        <div className="header_info_block">
          <img className="info_img" src={exitImg} alt="exitImg" />
        </div>
      </div>
    </div>
  );
}

export default Header;
