import axios from "axios";

import { API_BASE_URL } from ".";

export const createGroup = async (token, data) => {
    const url = API_BASE_URL + "/api/group";

    const headers = {
        Authorization: 'Bearer ' + token
    }

    return await axios
        .post(url, data, { headers })
        .then((response) => {
            if(response.status === 201) {
                alert('그룹이 생성되었습니다.');
                return true;
            }
            return false;
        })
        .catch((error) => {
            alert('ERROR: group create');
            return false;
        });
}