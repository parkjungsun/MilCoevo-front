import { plusDate } from "../../../utils/dateUtil";

function NoticeBox({
  noticeId,
  title,
  date,
  position,
  nickname,
  changeMode,
  changePage,
}) {
  const moveToPage = () => {
    changePage(noticeId);
    changeMode(3);
  };

  return (
    <>
      <div className="list_block" onClick={() => moveToPage()}>
        <div className="list_front list_content">
          <p>{(plusDate(date, 0)).slice(0,4)}<br />{(plusDate(date, 0)).slice(5)}</p>
        </div>
        <div className="list_mid list_content ">
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

export default NoticeBox;
