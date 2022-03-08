import * as groupApi from "../api/group";

const GET_GROUP = "GET_GROUP";
const CLEAR_GROUP = "CLEAR_GROUP";
const EXPIRE_TOKEN = "EXPIRE_TOKEN";

export const createGroup = (token, data) => async (dispatch) => {
    return await groupApi.createGroup(token, data);
}

export const getGroup = (token, groupId) => async (dispatch) => {
    const result = await groupApi.getGroup(token, groupId);
    if(result.status === 200) {
        dispatch({ type: GET_GROUP, paylaod: result.data });
    } else if(result.status === 401) {
        dispatch({ type: EXPIRE_TOKEN });
    } else {
        dispatch({ type: CLEAR_GROUP });
    }
}

export const confirmGroup = (token, inviteCode) => async (dispatch) => {
    const result = await groupApi.confirmGroup(token, inviteCode);
    if(result.status === 200) {
        dispatch({ type: GET_GROUP, paylaod: result.data });
    } else if(result.status === 401) {
        dispatch({ type: EXPIRE_TOKEN });
    } else {
        alert("존재하지 않는 그룹입니다");
        dispatch({ type: CLEAR_GROUP });
    }
}

export const registerGroup = (token, data) => async (dispatch) => {
    return await groupApi.registerGroup(token, data);
}

export const clearGroup = () => ({ type: CLEAR_GROUP });

const initialState = {
    inviteCode: "",
    groupName: ""
}

export default function group(state = initialState, action) {
    switch(action.type) {
        case GET_GROUP:
            return action.paylaod;
        case CLEAR_GROUP:
            return initialState;
        default:
            return state;
    }
}