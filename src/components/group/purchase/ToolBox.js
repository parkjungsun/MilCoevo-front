import React, { useState } from "react";

import writeImg from "../../../image/write.png"
import penImg from "../../../image/pen.png";
import delImg from "../../../image/delete.png";

function ToolBox({ changeMode }) {
    const [mode, setMode] = useState(true);

    if(mode) {
        return (
            <div className="add_toolbox">
                <div className="add_item" onClick={() => setMode(false)}>
                    <img className="item_img" src={penImg} alt="penImg"/>
                </div>
            </div>
        );
    } else {
        return (
            <div className="add_toolbox">
                <div className="add_item_box">
                    <div className="add_item_description">
                        <p>지출내역 등록</p>
                    </div>
                    <div className="add_item" onClick={() => changeMode(2)}>
                        <img className="item_img"  src={writeImg} alt="writeImg"/>
                    </div>
                </div>
                <div className="add_item_box">
                    <div className="add_item_description">
                        <p>취소</p>
                    </div>
                    <div className="add_item" onClick={() => setMode(true)}>
                        <img className="item_img" src={delImg} alt="delImg"/>
                    </div>
                </div>
            </div>
        );
    }
}

export default ToolBox;