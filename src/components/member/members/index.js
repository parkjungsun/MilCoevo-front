import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { clearMember, getMembers } from "../../../modules/members";
import Header from "../../common/header";
import MemberList from "./MemberList";
import Register from "./Register";

function Members() {
    const dispatch = useDispatch();

    const token = useSelector((state) => state.token);
    const members = useSelector((state) => state.members);

    useEffect(() => {
        if(token !== "" && token !== "NONE") {
            dispatch(getMembers(token));
        }
        return () => {
            dispatch(clearMember());
        };
    }, [token, dispatch]);

    return (
        <>
            <Header />
            <div className="member_container">
                <div className="term" />
                <MemberList members={members} />
            </div>
            <Register />
        </>
    );
}

export default Members;