import axios from "axios";

import { API_BASE_URL } from ".";

export const getAbsences = async (token, groupId, search) => {
    const url = API_BASE_URL + "/api/absence/"+groupId+"/list?page="+search.index+"&size=30";

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

export const getAbsence = async (token, groupId, absenceId) => {
    const url = API_BASE_URL + "/api/absence/"+groupId+"/detail/"+absenceId;

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

export const addAbsence = async (token, groupId, data) => {
    const url = API_BASE_URL + "/api/absence/"+groupId;

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

export const updateAbsence = async (token, groupId, absenceId, data) => {
    const url = API_BASE_URL + "/api/absence/"+groupId+"/detail/"+absenceId;

    const headers = {
        Authorization: 'Bearer ' + token
    }

    return axios
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