import * as tokenApi from "../api/token";
import * as authApi from "../api/auth";

const SET_TOKEN = "SET_TOKEN";
const EXPIRE_TOKEN = "EXPIRE_TOKEN";
const CLEAR_TOKEN = "CLEAR_TOKEN";

export const userlogin = (data) => async (dispatch) => {
    const token = await authApi.userLogin(data);
    dispatch({ type: SET_TOKEN, payload: token });
}
export const checkToken = () => async (dispatch) => {
    const token = await tokenApi.tokenCheck();
    dispatch({ type: SET_TOKEN, payload: token });
}
export const deleteToken = () => async (dispatch) => {
    await tokenApi.tokenDestroy();
    dispatch(clearToken());
}
export const setToken = (token) => ({ type: SET_TOKEN, payload: token });
export const expireToken = () => ({ type: EXPIRE_TOKEN, payload: "NONE" });
export const clearToken = () => ({ type: CLEAR_TOKEN, payload: "" });

const initialState = "NONE";

export default function token(state = initialState, action) {
    switch(action.type) {
        case SET_TOKEN:
            return action.payload;
        case EXPIRE_TOKEN:
            return action.payload;
        case CLEAR_TOKEN:
            return action.payload;
        default:
            return state;
    }
}