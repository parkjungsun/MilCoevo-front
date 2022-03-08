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
            return {
                status: 200,
                data: response.data.data.content
            };
        })
        .catch((error) => {
            if (error.response && error.response.status === 401) {
                return {
                    status: 401
                }
            }
            return {
                status: 500,
                data: []
            };
        });
};

export const getMember = async (token, groupId) => {
    const url = API_BASE_URL + "/api/member/"+groupId;

    const headers = {
        Authorization: 'Bearer ' + token
    }

    return await axios
        .get(url, { headers })
        .then((response) => {
            return {
                status: 200,
                data: response.data.data
            };
        })
        .catch((error) => {
            if (error.response && error.response.status === 400) {
                return {
                    status: 400
                }
            }
            if (error.response && error.response.status === 401) {
                return {
                    status: 401
                }
            }
            return {
                status: 500
            };
        });
}

export const updateMember = async (token, groupId, data) => {
    const url = API_BASE_URL + "/api/member/"+groupId;

    const headers = {
        Authorization: 'Bearer ' + token
    }
    
    return await axios
        .patch(url, data, { headers })
        .then((response) => {
            return {
                status: 200
            }
        })
        .catch((error) => {
            if (error.response && error.response.status === 400) {
                return {
                    status: 400
                }
            }
            if (error.response && error.response.status === 401) {
                return {
                    status: 401
                }
            }
            return {
                status: 500
            };
        });
}

export const exitMember = async (token, groupId) => {
    const url = API_BASE_URL + "/api/member/"+groupId;

    const headers = {
        Authorization: 'Bearer ' + token
    }
    
    return await axios
        .delete(url, { headers })
        .then((response) => {
            return {
                status: 200
            }
        })
        .catch((error) => {
            if (error.response && error.response.status === 400) {
                return {
                    status: 400
                }
            }
            if (error.response && error.response.status === 401) {
                return {
                    status: 401
                }
            }
            return {
                status: 500
            };
        });
}