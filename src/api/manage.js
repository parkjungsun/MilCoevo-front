import axios from "axios";

import { API_BASE_URL } from ".";

export const getGroupMembers = async (token, groupId, search) => {
    const url = API_BASE_URL + "/api/group/"+groupId+"/member";

    const headers = {
        Authorization: 'Bearer ' + token
    }

    return axios
        .post(url, search, { headers })
        .then((response) => {
            return {
                status: 200,
                data: response.data.data.content
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

export const updateGroupMember = async (token, groupId, memberId, data) => {
    const url = API_BASE_URL + "/api/group/"+groupId+"/member/"+memberId;

    const headers = {
        Authorization: 'Bearer ' + token
    }

    return axios
        .patch(url, data, { headers })
        .then((response) => {
            return {
                status: 200
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

export const banGroupMember = async (token, groupId, memberId) => {
    const url = API_BASE_URL + "/api/group/"+groupId+"/member/"+memberId;

    const headers = {
        Authorization: 'Bearer ' + token
    }

    return axios
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