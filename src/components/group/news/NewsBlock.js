import React from "react";
import { calculateDate } from "../../../utils/dateUtil";

function NewsBlock({ title, imageLink, link, keyword, pubDate }) {
  return (
    <>
      <div className="news_block" onClick={() => window.open(link, "_blank")}>
        <div className="news_img"></div>
        <div className="news_content">
          <div className="title">
            {title
              .replace(/&quot;/gi, "")
              .replace(/<b>/gi, "")
              .replace(/<\/b>/gi, "")}
          </div>
          <div className="theme_highlight2">
            {calculateDate(pubDate)} | #{keyword}
          </div>
        </div>
      </div>
    </>
  );
}

export default NewsBlock;
