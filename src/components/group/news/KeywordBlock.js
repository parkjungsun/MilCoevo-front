import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { delKeyword } from "../../../modules/keywords";

function KeywordBlock({ content, delKey }) {
    const dispatch = useDispatch();

    const { id } = useParams();
    const token = useSelector((state) => state.token);

    const deleteKeyword = () => {
        dispatch(delKeyword(token, id, delKey));
    };
    
    return <div className="keyword_form">
        <p>{content}</p>
        <p className="delete_button" onClick={() => deleteKeyword()}/>
    </div>;
}

export default KeywordBlock;