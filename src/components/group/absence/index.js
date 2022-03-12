import React, { useState } from "react";
import AbsenceAdd from "./AbsenceAdd";
import AbsenceList from "./AbsenceList";
import AbsenceUpdate from "./AbsenceUpdate";

function Absence() {
  const [mode, setMode] = useState(1);
  const [page, setPage] = useState(null);
  const [now, setNow] = useState(new Date());
  const [process, setProcess] = useState("SUGGESTED");

  const changeMode = (mod) => {
    setMode(mod);
  };

  const changePage = (pag) => {
    setPage(pag);
  }

  if (mode === 1) return <AbsenceList
  now={now}
  setNow={setNow}
  process={process}
  setProcess={setProcess} 
  changeMode={changeMode} 
  changePage={changePage} />;
  if (mode === 2) return <AbsenceAdd changeMode={changeMode} />;
  if (mode === 3) return <AbsenceUpdate 
  page={page}
  changeMode={changeMode} 
  changePage={changePage} />;
}

export default Absence;
