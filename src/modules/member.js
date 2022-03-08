import * as memberApi from "../api/members"; 

const GET_MEMBER = "GET_MEMBER";
const CLEAR_MEMBER = "CLEAR_MEMBER";
const CLEAR_GROUP = "CLEAR_GROUP";
const EXPIRE_TOKEN = "EXPIRE_TOKEN";

export const getMember = (token, groupId) => async (dispatch) => {
    const result = await memberApi.getMember(token, groupId);
    if(result.status === 200) {
        dispatch({ type: GET_MEMBER, paylaod: result.data });
    } else if(result.status === 401) {
        dispatch({ type: EXPIRE_TOKEN });
    } else {
        dispatch({ type: CLEAR_MEMBER });
    }
}

export const updateMember = (token, groupId, data) => async (dispatch) => {
    const result = await memberApi.updateMember(token, groupId, data);
    if(result.status === 401) {
        dispatch({ type: EXPIRE_TOKEN });
    }
    if(result.status === 200) {
        alert("저장되었습니다");
    }
}

export const exitMember = (token, groupId) => async (dispatch) => {
    const result = await memberApi.exitMember(token, groupId);
    if(result.status === 401) {
        dispatch({ type: EXPIRE_TOKEN });
    }
    if(result.status === 200) {
        alert("그룹에서 탈퇴하였습니다");
        dispatch({ type: CLEAR_MEMBER });
        dispatch({ type: CLEAR_GROUP });
    }
}

export const clearMem = () => ({ type: CLEAR_MEMBER });

const initialState = {
    email: "",
    position: "",
    nickname: "",
    rank: ""
}

export default function member(state = initialState, action) {
    switch(action.type) {
        case GET_MEMBER:
            return action.paylaod;
        case CLEAR_MEMBER:
            return initialState;
        default:
            return state;
    }
}