import React, { useEffect, useState } from "react";
import { calculateDate } from "../../../utils/dateUtil";
import { getUrlMeta } from "../../../utils/ogsUtil";

function NewsBlock({ title, imageLink, link, keyword, pubDate }) {

  const proxyUrl = 
    "http://api.scraperapi.com?api_key="+
    process.env.REACT_APP_PROXY_KEY+"&url="+link;

  const [image, setImage] = useState("");
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    async function fetchUrl() {
      let im = await getUrlMeta(proxyUrl);
      setImage(im.image);
    }
    if (false/*!isLoaded*/) {
      fetchUrl();
      setIsLoaded(true);
    }
  }, [image, isLoaded, proxyUrl]);

  return (
    <>
      <div className="news_block" onClick={() => window.open(link, "_blank")}>
        <div className="news_img">
          {isLoaded 
            ? <img className="news_image_url" src={image} alt="" />
            : <p className="theme_highlight">MININEWS</p>
          }
        </div>
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
