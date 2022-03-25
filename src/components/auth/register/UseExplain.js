import React from "react";
import { Link } from "react-router-dom";

function UseExplain() {
  return (
    <>
      <div className="container">
        <div className="container_title abr">
          <h2>ROKANEWS</h2>
          <h3>이용약관</h3>
        </div>
        <Link to="/register" className="atag link_form">
          뒤로가기
        </Link>
      </div>
    </>
  );
}

export default UseExplain;
