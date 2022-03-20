import * as groupApi from "../api/group";

const GET_GROUP = "GET_GROUP";
const UPDATE_INVITE_CODE = "UPDATE_INVITE_CODE";
const CLEAR_GROUP = "CLEAR_GROUP";
const EXPIRE_TOKEN = "EXPIRE_TOKEN";

export const createGroup = (token, data) => async (dispatch) => {
    return await groupApi.createGroup(token, data);
}

export const getGroup = (token, groupId) => async (dispatch) => {
    const result = await groupApi.getGroup(token, groupId);
    if(result.status === 200) {
        dispatch({ type: GET_GROUP, paylaod: result.data });
    } else if(result.status === 400) {
        dispatch({ type: GET_GROUP, paylaod: {groupName: "ERROR", inviteCode: "ERROR"} });
    }else if(result.status === 401) {
        dispatch({ type: EXPIRE_TOKEN });
    } else {
        dispatch({ type: CLEAR_GROUP });
    }
}

export const confirmGroup = (token, inviteCode) => async (dispatch) => {
    const result = await groupApi.confirmGroup(token, inviteCode);
    if(result.status === 200) {
        dispatch({ type: GET_GROUP, paylaod: result.data });
        return true;
    } else if(result.status === 401) {
        dispatch({ type: EXPIRE_TOKEN });
        return false;
    } else {
        alert("존재하지 않는 그룹입니다");
        dispatch({ type: CLEAR_GROUP });
        return false;
    }
}

export const registerGroup = (token, data) => async (dispatch) => {
    return await groupApi.registerGroup(token, data);
}

export const updateGroupname = (token, groupId, data) => async (dispatch) => {
    const result = await groupApi.updateGroupname(token, groupId, data);
    if(result.status === 200) {
        alert("저장되었습니다.");
    } else if(result.status === 401) {
        dispatch({ type: EXPIRE_TOKEN });
    } else {
        alert("존재하지 않는 그룹입니다");
        dispatch({ type: CLEAR_GROUP });
    }
}

export const updateInviteCode = (token, groupId) => async (dispatch) => {
    const result = await groupApi.updateInviteCode(token, groupId);
    if(result.status === 200) {
        alert("초대코드가 변경되었습니다");
        dispatch({ type: UPDATE_INVITE_CODE, paylaod: result.data });
    } else if(result.status === 401) {
        dispatch({ type: EXPIRE_TOKEN });
    } else {
        alert("존재하지 않는 그룹입니다");
        dispatch({ type: CLEAR_GROUP });
    }
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
        case UPDATE_INVITE_CODE:
            return {
                ...state,
                inviteCode: action.paylaod
            };
        case CLEAR_GROUP:
            return initialState;
        default:
            return state;
    }
}