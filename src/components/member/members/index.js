import React from "react";
import { Link } from "react-router-dom";
import Header from "../../common/header";
import Member from "./Member";
import Register from "./Register";

function Members() {
    return (
        <>
            <Header />
            <div className="member_container">
                <div className="term" />
                <Member />
                <div className="no_content">
                    <p>가입된 그룹이 없습니다</p>
                    <Link to="/group/register" className="atag theme_highlight">
                        새 그룹 가입하기
                    </Link>
                </div>
            </div>
            <Register />
        </>
    );
}

export default Members;