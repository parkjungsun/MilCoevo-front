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

export const getTime = (date) => {
  let workDate = new Date(date);

  return ("0"+workDate.getHours()).slice(-2)+":"+workDate.getMinutes();
}

export const isBetDay = (date, index, sdate, edate) => {
  let now = new Date(date);
  let eD = new Date(edate);
  now.setDate(now.getDate() + index);
  eD.setDate(eD.getDate() + 1);

  return now >= sdate && now <= eD;
}

export const plusDay = (date, index) => {
  let now = new Date(date);
  now.setDate(now.getDate() + index);

  let week = ['일', '월', '화', '수', '목', '금', '토']; 
  let dayOfWeek = week[now.getDay()]; 
  return dayOfWeek;

}

export const plusDate = (date, index) => {
  let now = new Date(date);
  now.setDate(now.getDate() + index);

  let year = now.getFullYear();
  let month = ("0" + (1 + now.getMonth())).slice(-2);
  let day = ("0" + now.getDate()).slice(-2);

  return year + "." + month + "." + day;
}

export const nextDate = (date) => {
  let now = new Date(date);
  now.setDate(now.getDate() + 7);
  return now;
}

export const prevDate = (date) => {
  let now = new Date(date);
  now.setDate(now.getDate() - 7);
  return now;
}

export const frontYMD = (date) => {
  let year = date.getFullYear();
  let month = ("0" + (1 + date.getMonth())).slice(-2);
  let day = ("0" + date.getDate()).slice(-2);

  return year + "-" + month + "-" + day;
}

export const rearYMD = (date) => {
  let now = new Date(date);
  now.setDate(now.getDate() + 6);

  let year = now.getFullYear();
  let month = ("0" + (1 + now.getMonth())).slice(-2);
  let day = ("0" + now.getDate()).slice(-2);

  return year + "-" + month + "-" + day;
}

export const termDate = () => {
  let date = new Date();
  let day = date.getHours();
  let min = date.getMinutes();

  let one = (day + "").padStart(2, 0);
  let two = (day - 1 + "").padStart(2, 0);
  let three = (day - 2 + "").padStart(2, 0);
  if(min >= 30) {
    return <>
      <option value={one+"30"}>{one+":30"}</option>
      <option value={one+"00"}>{one+":00"}</option>
      <option value={two+"30"}>{two+":30"}</option>
      <option value={two+"00"}>{two+":00"}</option>
    </>;
  } else {
    return <>
      <option value={one+"00"}>{one+":00"}</option>
      <option value={two+"30"}>{two+":30"}</option>
      <option value={two+"00"}>{two+":00"}</option>
      <option value={three+"30"}>{three+":30"}</option>
    </>;
  }
}

export const frontMonth = (date) => {
  let now = new Date(date);
  let year = now.getFullYear();
  let month = ("0" + (1 + now.getMonth())).slice(-2);
  let day = "01";

  return year + "-" + month + "-" + day;
}

export const rearMonth = (date) => {
  let now = new Date(date.getFullYear(), date.getMonth() + 1, 0);

  let year = now.getFullYear();
  let month = ("0" + (1 + now.getMonth())).slice(-2);
  let day = now.getDate();

  return year + "-" + month + "-" + day;
} 

export const nextMonth = (date) => {
  return new Date(date.getFullYear(), date.getMonth() + 1, 1);
}

export const prevMonth = (date) => {
  return new Date(date.getFullYear(), date.getMonth() - 1, 1);
}