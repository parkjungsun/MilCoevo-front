import axios from "axios";

import { API_BASE_URL } from ".";

export const userRegister = async (data) => {
  const url = API_BASE_URL + "/api/user/register";

  return await axios
    .post(url, data)
    .then((response) => {
      if (response.status === 201) {
        alert("가입 되었습니다.");
        return true;
      }
      return false;
    })
    .catch((error) => {
      if (error.response && error.response.status === 409) {
        alert("이미 가입된 이메일입니다.");
      } else {
        alert("ERROR: user register");
      }
      return false;
    });
};

export const userLogin = async (data) => {
    const url = API_BASE_URL + "/api/user/login";

    return await axios
    .post(url, data)
    .then((response) => {
        return response.data.message;
    })
    .catch((error) => {
        return "";
    });
}
