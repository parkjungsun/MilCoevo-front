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
                return {
                    status: 201,
                    data: true
                };
            }
            if(response.status === 204) {
                alert('최대 그룹 개수는 5개입니다.');
                return {
                    status: 204,
                    data: true
                };
            }
            return {
                status: 200,
                data: false
            };
        })
        .catch((error) => {
            if (error.response && error.response.status === 400) {
                alert("입력값을 확인해주세요");
                return {
                    status: 400,
                    data: false
                };
            } if(error.response && error.response.status === 401) {
                alert("다시 시도해주세요");
                return {
                    status: 401,
                    data: false
                };
            } else {
                alert('ERROR: group create');
                return {
                    status: 500,
                    data: false
                };
            }
        });
}

export const getGroup = async (token, groupId) => {
    const url = API_BASE_URL + "/api/group/"+groupId;

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

export const confirmGroup = async (token, inviteCode) => {
    const url = API_BASE_URL + "/api/group/register/"+inviteCode;

    const headers = {
        Authorization: 'Bearer ' + token
    }

    return await axios
        .get(url, { headers })
        .then((response) => {
            return {
                status: 200,
                data: {
                    groupName: response.data.message,
                    inviteCode: inviteCode
                }
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

export const registerGroup = async (token, data) => {
    const url = API_BASE_URL + "/api/group/register";

    const headers = {
        Authorization: 'Bearer ' + token
    }

    return await axios
        .post(url, data, { headers })
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