import React from "react";

function PurchaseBox({
  purchasePrice,
  purpose,
  title,
  position,
  nickname,
  processStatus,
  purchaseId,
  changeMode,
  changePage,
}) {
  const moveToPage = () => {
    changePage(purchaseId);
    changeMode(3);
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

  return (
    <>
      <div className="list_block" onClick={() => moveToPage()}>
        <div className="list_front list_content">
          <p>{renderPurpose(purpose)}</p>
        </div>
        <div
          className={
            processStatus === "SUGGESTED"
              ? "list_mid list_content "
              : "list_mid list_content list_cancel"
          }
        >
          <p>
            {title}
            <br />
            <span className="pur_price">
              {purchasePrice ? (purchasePrice + "").replace(
                /\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g,
                ","
              ) : 0}
              원
            </span>
          </p>
        </div>
        <div className="list_rear list_content">
          <p>
            {position} {nickname}
          </p>
        </div>
      </div>
    </>
  );
}

export default PurchaseBox;
