import * as purchasesApi from "../api/purchases";

const GET_PURCHASE = "GET_PURCHASE";
const CLEAR_PURCHASE = "CLEAR_PURCHASE";
const EXPIRE_TOKEN = "EXPIRE_TOKEN";

export const getPurchase = (token, groupId, purchaseId) => async (dispatch) => {
    const result = await purchasesApi.getPurchase(token, groupId, purchaseId);
    if (result.status === 200) {
        dispatch({ type: GET_PURCHASE, payload: result.data });
    } else if (result.status === 401) {
      dispatch({ type: EXPIRE_TOKEN });
    } else {
      dispatch({ type: CLEAR_PURCHASE });
    }
}

export const updatePurchase = (token, groupId, purchaseId, data) => async (dispatch) => {
    const result = await purchasesApi.updatePurchase(token, groupId, purchaseId, data);
    if (result.status === 200) {
      dispatch(getPurchase(token, groupId, purchaseId));
    } else if (result.status === 401) {
      dispatch({ type: EXPIRE_TOKEN });
    } else if (result.status === 403){
      alert("권한이 없습니다")
    } else {
      dispatch({ type: CLEAR_PURCHASE });
    }
}

export const clearPurchase = () => ({ type: CLEAR_PURCHASE });

const initialState = {};

export default function purchase(state = initialState, action) {
    switch (action.type) {
        case GET_PURCHASE:
            return action.payload;
        case CLEAR_PURCHASE:
            return initialState;
        default:
            return state;
    }
}