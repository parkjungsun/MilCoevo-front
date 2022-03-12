import React from "react";

function Nav({ navi, changeNavi }) {
    return (
        <div className="navigator">
           <p className={navi === 1 ? "nav_item nav_item_on" : "nav_item"} onClick={() => changeNavi(1)}>뉴스</p>
           <p className={navi === 2 ? "nav_item nav_item_on" : "nav_item"} onClick={() => changeNavi(2)}>일정</p>
           <p className={navi === 3 ? "nav_item nav_item_on" : "nav_item"} onClick={() => changeNavi(3)}>휴가</p>
           <p className={navi === 4 ? "nav_item nav_item_on" : "nav_item"} onClick={() => changeNavi(4)}>지출</p>
           <p className={navi === 5 ? "nav_item nav_item_on" : "nav_item"} onClick={() => changeNavi(5)}>공지</p>
           <p className={navi === 6 ? "nav_item nav_item_on" : "nav_item"} onClick={() => changeNavi(6)}>인원</p>
        </div>
    );
}

export default Nav;