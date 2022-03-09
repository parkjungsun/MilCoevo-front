export const calculateDate = (pubDate) => {
  let newsDate = new Date(pubDate);
  let now = new Date();

  let ti = now.getTime() - newsDate.getTime();
  let tim = ti / (1000 * 60); // 분

  if (tim < 60) {
    return Math.floor(tim) + "분전";
  } else {
    tim = tim / 60; // 시s
    if (tim < 24) {
      return Math.floor(tim) + "시간전";
    } else {
      tim = tim / 24; // 일
      return Math.floor(tim) + "일전";
    }
  }
};

export const termDate = () => {
  let date = new Date();
  let day = date.getHours();
  let min = date.getMinutes();

  let one = (day + "").padStart(2, 0);
  let two = (day - 1 + "").padStart(2, 0);
  let three = (day - 2 + "").padStart(2, 0);
  if(min >= 30) {
    return <>
      <option value={one+"30"}>{one+"30"}</option>
      <option value={one+"00"}>{one+"00"}</option>
      <option value={two+"30"}>{two+"30"}</option>
      <option value={two+"00"}>{two+"00"}</option>
    </>;
  } else {
    return <>
      <option value={one+"00"}>{one+"00"}</option>
      <option value={two+"30"}>{two+"30"}</option>
      <option value={two+"00"}>{two+"00"}</option>
      <option value={three+"30"}>{three+"30"}</option>
    </>;
  }
}