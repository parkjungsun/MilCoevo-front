import React from "react";
import { Link } from "react-router-dom";

function UseExplain() {
  return (
    <>
      <div className="container">
        <div className="container_title abr">
          <h2>MILINEWS</h2>
          <h3>이용약관</h3>
        </div>
        <button onClick={() => window.location.replace("/register")} className="atag link_form">
          뒤로가기
        </button>
      </div>
    </>
  );
}

export default UseExplain;
