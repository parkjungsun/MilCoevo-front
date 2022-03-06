import React, { useState } from "react";
import AbsenceAdd from "./AbsenceAdd";
import AbsenceList from "./AbsenceList";
import AbsenceUpdate from "./AbsenceUpdate";

function Absence() {
  const [mode, setMode] = useState(1);

  const changeMode = (mod) => {
    setMode(mod);
  };

  if (mode === 1) return <AbsenceList changeMode={changeMode} />;
  if (mode === 2) return <AbsenceAdd changeMode={changeMode} />;
  if (mode === 3) return <AbsenceUpdate changeMode={changeMode} />;
}

export default Absence;
