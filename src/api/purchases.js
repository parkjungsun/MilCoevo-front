import axios from "axios";

import { API_BASE_URL } from ".";

export const getPurchases = async (token, groupId, search) => {
    const url = API_BASE_URL + "/api/purchase/"+groupId+"/list?page="+search.index+"&size=10";

    const headers = {
        Authorization: 'Bearer ' + token
    }

    return axios
    .post(url, search, { headers })
    .then((response) => {
        return {
            status: 200,
            data: {
                total: response.data.data.total,
                office: response.data.data.office,
                lecture: response.data.data.lecture,
                travel: response.data.data.travel,
                etc: response.data.data.etc,
                data: response.data.data.purchases.content
            }
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

export const getPurchase = async (token, groupId, purchaseId) => {
    const url = API_BASE_URL + "/api/purchase/"+groupId+"/detail/"+purchaseId;

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

export const addPurchase = async (token, groupId, data) => {
    const url = API_BASE_URL + "/api/purchase/"+groupId;

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

export const updatePurchase = async (token, groupId, purchaseId, data) => {
    const url = API_BASE_URL + "/api/purchase/"+groupId+"/detail/"+purchaseId;

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