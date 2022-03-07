import * as memberApi from "../api/members"; 

const GET_MEMBERS = "GET_MEMBERS";
const CLEAR_MEMBERS = "CLEAR_MEMBERS";

export const getMembers = (token) => async (dispatch) => {
    const data = await memberApi.getMembers(token);
    dispatch({ type: GET_MEMBERS, payload: data});
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
            return initialState;
    }
}