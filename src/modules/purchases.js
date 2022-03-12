import * as purchasesApi from "../api/purchases";

const GET_PURCHASES = "GET_PURCHASES";
const CLEAR_PURCHASES = "CLEAR_PURCHASES";
const EXPIRE_TOKEN = "EXPIRE_TOKEN";

export const clearPurchases = () => ({ type: CLEAR_PURCHASES });

export const addPurchase = (token, groupId, data) => async (dispatch) => {
  return await purchasesApi.addPurchase(token, groupId, data);
};

export const getPurchases = (token, groupId, search) => async (dispatch) => {
  const result = await purchasesApi.getPurchases(token, groupId, search);
  if (result.status === 200) {
    dispatch({
      type: GET_PURCHASES,
      payload: {
        index: result.data.data.length === 0 ? search.index : search.index + 1,
        frontDate: search.frontDate,
        rearDate: search.rearDate,
        processStatus: search.processStatus,
        total: result.data.total,
        office: result.data.office,
        lecture: result.data.lecture,
        travel: result.data.travel,
        etc: result.data.etc,
        data: result.data.data,
      },
    });
  } else if (result.status === 401) {
    dispatch({ type: EXPIRE_TOKEN });
  } else {
    dispatch({ type: CLEAR_PURCHASES });
  }
};

const initialState = {
  total: 0,
  office: 0,
  lecture: 0,
  travel: 0,
  etc: 0,

  index: 0,
  frontDate: "",
  rearDate: "",
  processStatus: "SUGGESTED",
  data: [],
};

export default function purchases(state = initialState, action) {
  switch (action.type) {
    case GET_PURCHASES:
      return {
        index: action.payload.index,
        frontDate: action.payload.frontDate,
        rearDate: action.payload.rearDate,
        processStatus: action.payload.processStatus,
        total: action.payload.total,
        office: action.payload.office,
        lecture: action.payload.lecture,
        travel: action.payload.travel,
        etc: action.payload.etc,
        data: state.data.concat(action.payload.data),
      };
    case CLEAR_PURCHASES:
      return initialState;
    default:
      return state;
  }
}
