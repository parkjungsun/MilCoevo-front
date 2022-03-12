import React from "react";

function AbsenceBox({
  reason,
  title,
  position,
  nickname,
  processStatus,
  absenceId,
  changeMode,
  changePage,
}) {
  const moveToPage = () => {
    changePage(absenceId);
    changeMode(3);
  };

  const renderReason = (reason) => {
    switch (reason) {
      case "ANNUAL":
        return "연가";
      case "OFFICIAL":
        return "공가";
      case "PETITION":
        return "청원";
      case "BUSINESS":
        return "출장";
      case "DISPATCH":
        return "파견";
      case "EDUCATION":
        return "교육";
      case "ETC_REASON":
        return "기타";
      default:
        return "";
    }
  };

  return (
    <>
      <div className="list_block" onClick={() => moveToPage()}>
        <div className="list_front list_content">
          <p>{renderReason(reason)}</p>
        </div>
        <div
          className={
            processStatus === "SUGGESTED"
              ? "list_mid list_content "
              : "list_mid list_content list_cancel"
          }
        >
          <p>{title}</p>
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

export default AbsenceBox;
