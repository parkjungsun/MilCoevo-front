import * as memberApi from "../api/members"; 

const GET_MEMBERS = "GET_MEMBERS";
const CLEAR_MEMBERS = "CLEAR_MEMBERS";
const EXPIRE_TOKEN = "EXPIRE_TOKEN";

export const getMembers = (token) => async (dispatch) => {
    const result = await memberApi.getMembers(token);
    if(result.status === 200) {
        dispatch({ type: GET_MEMBERS, payload: result.data});
    } else if(result.status === 401) {
        dispatch({ type: EXPIRE_TOKEN });
    } else {
        dispatch({ type: GET_MEMBERS, payload: result.data});
    }
}
export const clearMember = () => ({ type: CLEAR_MEMBERS, payload: [] });

const initialState = [];

export default function members(state = initialState, action) {
    switch(action.type) {
        case GET_MEMBERS:
            return action.payload;
        case CLEAR_MEMBERS:
            return action.payload;
        default:
            return state;
    }
}