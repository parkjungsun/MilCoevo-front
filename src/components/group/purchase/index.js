import React, { useState } from "react";

import PurchaseList from "./PurchaseList";
import PurchaseAdd from "./PurchaseAdd";
import PurchaseUpdate from "./PurchaseUpdate";

function Purchase() {
  const [mode, setMode] = useState(1);
  const [page, setPage] = useState(null);
  const [now, setNow] = useState(new Date((new Date()).getFullYear(), (new Date()).getMonth(), 1));
  const [process, setProcess] = useState("SUGGESTED");

  const changeMode = (mod) => {
    setMode(mod);
  };

  const changePage = (pag) => {
    setPage(pag);
  };

  if (mode === 1)
    return (
      <PurchaseList
        now={now}
        setNow={setNow}
        process={process}
        setProcess={setProcess}
        changeMode={changeMode}
        changePage={changePage}
      />
    );
  if (mode === 2) return <PurchaseAdd changeMode={changeMode} />;
  if (mode === 3)
    return (
      <PurchaseUpdate
        page={page}
        changeMode={changeMode}
        changePage={changePage}
      />
    );
}

export default Purchase;
