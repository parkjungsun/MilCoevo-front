import axios from "axios";

import { API_BASE_URL } from ".";

export const getMembers = async (token) => {
    const url = API_BASE_URL + "/api/member";

    const headers = {
        Authorization: 'Bearer ' + token
    }

    return await axios
        .get(url, { headers })
        .then((response) => {
            return response.data.data.content;
        })
        .catch((error) => {
            return [];
        });
};

