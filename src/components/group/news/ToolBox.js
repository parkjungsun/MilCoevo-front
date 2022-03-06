import React, { useState } from "react";

import setImg from "../../../image/settingW.png"
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
                        <p>키워드 관리</p>
                    </div>
                    <div className="add_item" onClick={() => changeMode(2)}>
                        <img className="item_img"  src={setImg} alt="setImg"/>
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
