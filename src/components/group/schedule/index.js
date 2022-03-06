import React, { useState } from "react";
import ScheduleAdd from "./ScheduleAdd";
import ScheduleList from "./ScheduleList";
import ScheduleUpdate from "./ScheduleUpdate";

function Schedule() {
  const [mode, setMode] = useState(1);

  const changeMode = (mod) => {
    setMode(mod);
  };

  if (mode === 1) return <ScheduleList changeMode={changeMode} />;
  if (mode === 2) return <ScheduleAdd changeMode={changeMode} />;
  if (mode === 3) return <ScheduleUpdate changeMode={changeMode} />;
}

export default Schedule;
