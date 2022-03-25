import React from "react";
import { Link } from "react-router-dom";

function PrivacyExplain() {
  return (
    <>
      <div className="container">
        <div className="container_title abr">
          <h2>ROKANEWS</h2>
          <h3>개인정보 취급방침</h3>
        </div>
        <Link to="/register" className="atag link_form">
          뒤로가기
        </Link>
      </div>
    </>
  );
}

export default PrivacyExplain;
