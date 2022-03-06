import React, { useState } from "react";

import PurchaseList from "./PurchaseList";
import PurchaseAdd from "./PurchaseAdd";
import PurchaseUpdate from "./PurchaseUpdate";

function Purchase() {
  const [mode, setMode] = useState(1);

  const changeMode = (mod) => {
    setMode(mod);
  };

  if (mode === 1) return <PurchaseList changeMode={changeMode} />;
  if (mode === 2) return <PurchaseAdd changeMode={changeMode} />;
  if (mode === 3) return <PurchaseUpdate changeMode={changeMode} />;
}

export default Purchase;
