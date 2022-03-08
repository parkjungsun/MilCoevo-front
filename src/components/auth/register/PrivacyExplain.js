import React from "react";
import { Link, use } from "react-router-dom";

function PrivacyExplain() {
  return (
    <>
      <div className="container">
        <div className="container_title abr">
          <h2>MILINEWS</h2>
          <h3>개인정보 취급방침</h3>
        </div>
        <button onClick={() => window.location.replace("/register")} className="atag link_form">
          뒤로가기
        </button>
      </div>
    </>
  );
}

export default PrivacyExplain;
