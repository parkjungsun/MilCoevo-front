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
