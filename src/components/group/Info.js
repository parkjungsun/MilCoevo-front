import React from "react";

import News from "./news";
import Schedule from "./schedule";
import Absence from "./absence";
import Purchase from "./purchase";

function Info({navi}) {
    if(navi === 1) return <News/>;
    if(navi === 2) return <Schedule />;
    if(navi === 3) return <Absence />;
    if(navi === 4) return <Purchase />;
    if(navi === 5) return null;
    if(navi === 6) return null;
}
  
export default Info;