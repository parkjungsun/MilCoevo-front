import React, { useState } from "react";

import NoticeList from "./NoticeList";
import NoticeAdd from "./NoticeAdd";
import NoticeUpdate from "./NoticeUpdate";

function Notice() {
  const [mode, setMode] = useState(1);
  const [page, setPage] = useState(null);
  const [stitle, setStitle] = useState("");

  const changeMode = (mod) => {
    setMode(mod);
  };

  const changePage = (pag) => {
    setPage(pag);
  };

  if (mode === 1)
    return (
      <NoticeList
        stitle={stitle}
        setStitle={setStitle}
        changeMode={changeMode}
        changePage={changePage}
      />
    );
  if (mode === 2) return <NoticeAdd changeMode={changeMode} />;
  if (mode === 3)
    return (
      <NoticeUpdate
        page={page}
        changeMode={changeMode}
        changePage={changePage}
      />
    );
}

export default Notice;
