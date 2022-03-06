import React, { useState } from "react";
import Header from "../common/header";
import Nav from "../common/nav";
import Info from "./Info";

function Group() {
  const [navi, setNavi] = useState(1);

  const changeNavi = (nav) => {
      setNavi(nav);
  }

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
