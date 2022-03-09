import axios from "axios";

import { API_BASE_URL } from ".";

export const getNews = async (token, groupId, index, time) => {
    const url = API_BASE_URL + "/api/news/"+groupId+"?page="+index+"&size=10";

    const headers = {
        Authorization: 'Bearer ' + token
    }

    return await axios
        .post(url, { timeIndex: time }, { headers })
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

export const getKeywords = async (token, groupId) => {
    const url = API_BASE_URL + "/api/news/"+groupId+"/keyword";

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

export const addKeyword = async (token, groupId, data) => {
    const url = API_BASE_URL + "/api/news/"+groupId+"/keyword";

    const headers = {
        Authorization: 'Bearer ' + token
    }

    return await axios
        .post(url, data, { headers })
        .then((response) => {
            return {
                status: 201,
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

export const delKeyword = async (token, groupId, keywordId) => {
    const url = API_BASE_URL + "/api/news/"+groupId+"/keyword/"+keywordId;

    const headers = {
        Authorization: 'Bearer ' + token
    }

    return await axios
        .delete(url, { headers })
        .then((response) => {
            console.log(response);
            return {
                status: 200
            };
        })
        .catch((error) => {
            console.log(error);
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