import React from "react";

function PurchaseBox({ changeMode }) {
    return (
        <>
        <div className="list_block" onClick={() => changeMode(3)}>
          <div className="list_front list_content">
            <p>사무용품</p>
          </div>
          <div className="list_mid list_content list_cancel">
            <p>20,000</p>
          </div>
          <div className="list_rear list_content">
            <p>프로젝트 매니저 박정선</p>
          </div>
        </div>
      </>
    );
}

export default PurchaseBox;
