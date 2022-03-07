import axios from "axios";

import { API_BASE_URL } from ".";

export const tokenCheck = async () => {
  const url = API_BASE_URL + "/api/token/refresh";

  return await axios
    .get(url, { withCredentials: true })
    .then((response) => {
      return response.data.message;
    })
    .catch(() => {
        return "";
    });
};

export const tokenDestroy = async () => {
  const url = API_BASE_URL + "/api/token/destroy";

  await axios
    .get(url, { withCredentials: true })
    .then(() => {
      alert("로그아웃 되었습니다");
    })
    .catch(() => {
      alert("ERROR: Logout");
    });
};
