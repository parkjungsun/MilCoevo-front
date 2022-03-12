import axios from "axios";

import { API_BASE_URL } from ".";

export const getNotices = async (token, groupId, search) => {
    const url = API_BASE_URL + "/api/notice/"+groupId+"/list?page="+search.index+"&size=10";

    const headers = {
        Authorization: 'Bearer ' + token
    }

    return axios
        .post(url, search, { headers })
        .then((response) => {
            return {
                status: 200,
                data: response.data.data.content
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

export const addNotice = async (token, groupId, data) => {
    const url = API_BASE_URL + "/api/notice/"+groupId;

    const headers = {
        Authorization: 'Bearer ' + token
    }

    return axios
    .post(url, data, { headers })
    .then((response) => {
        return {
            status: 201
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


export const getNotice = async (token, groupId, noticeId) => {
    const url = API_BASE_URL + "/api/notice/"+groupId+"/detail/"+noticeId;

    const headers = {
        Authorization: 'Bearer ' + token
    }

    return axios
    .get(url, { headers })
    .then((response) => {
        return {
            status: 200,
            data: response.data.data
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

export const delNotice = async (token, groupId, noticeId) => {
    const url = API_BASE_URL + "/api/notice/"+groupId+"/detail/"+noticeId;

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
        if (error.response && error.response.status === 403) {
            return {
                status: 403
            }
        }
        return {
            status: 500
        };
    });   
}

export const addComment = async (token, groupId, noticeId, data) => {
    const url = API_BASE_URL + "/api/notice/"+groupId+"/detail/"+noticeId+"/comment";

    const headers = {
        Authorization: 'Bearer ' + token
    }

    return axios
    .post(url, data, { headers })
    .then((response) => {
        return {
            status: 201,
            data: response.data.data
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

export const delComment = async (token, groupId, noticeId, commentId) => {
    const url = API_BASE_URL + "/api/notice/"+groupId+"/detail/"+noticeId+"/comment/"+commentId;

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
        if (error.response && error.response.status === 403) {
            return {
                status: 403
            }
        }
        return {
            status: 500
        };
    });
}