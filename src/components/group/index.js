import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Header from "../common/header";
import Nav from "../common/nav";
import Info from "./Info";

import { useParams } from "react-router-dom";

import { clearGroup, getGroup } from "../../modules/group";

function Group() {
  const dispatch = useDispatch();

  const [navi, setNavi] = useState(1);

  const { id } = useParams();
  const token = useSelector((state) => state.token);

  const changeNavi = (nav) => {
      setNavi(nav);
  }

  useEffect(() => {
    if (token !== "" && token !== "NONE") {
      dispatch(getGroup(token, id));
    }
    return () => {
      dispatch(clearGroup());
    };
  }, [token, dispatch]);

  return (
    <>
      <Header />
      <div className="main_container">
        <Nav navi={navi} changeNavi={changeNavi}/>
        <Info navi={navi} />
      </div>
    </>
  );
}

export default Group;
