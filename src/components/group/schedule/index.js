import React, { useState } from "react";
import ScheduleAdd from "./ScheduleAdd";
import ScheduleList from "./ScheduleList";
import ScheduleUpdate from "./ScheduleUpdate";

function Schedule() {
  const [mode, setMode] = useState(1);
  const [page, setPage] = useState(null);
  const [now, setNow] = useState(new Date());
  const [process, setProcess] = useState("SUGGESTED");

  const changeMode = (mod) => {
    setMode(mod);
  };

  const changePage = (pag) => {
    setPage(pag);
  };

  if (mode === 1)
    return (
      <ScheduleList
        now={now}
        setNow={setNow}
        process={process}
        setProcess={setProcess}
        changeMode={changeMode}
        changePage={changePage}
      />
    );
  if (mode === 2) return <ScheduleAdd changeMode={changeMode} />;
  if (mode === 3)
    return (
      <ScheduleUpdate
        changeMode={changeMode}
        changePage={changePage}
        page={page}
      />
    );
}

export default Schedule;
