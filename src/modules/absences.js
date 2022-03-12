import * as absencesApi from "../api/absences";

const GET_ABSENCES = "GET_ABSENCES";
const CLEAR_ABSENCES = "CLEAR_ABSENCES";
const EXPIRE_TOKEN = "EXPIRE_TOKEN";

export const addAbsence = (token, groupId, data) => async (dispatch) => {
  return await absencesApi.addAbsence(token, groupId, data);
};

export const getAbsences = (token, groupId, search) => async (dispatch) => {
  const result = await absencesApi.getAbsences(token, groupId, search);
  if (result.status === 200) {
    dispatch({
      type: GET_ABSENCES,
      payload: {
        index: search.index + 1,
        frontDate: search.frontDate,
        rearDate: search.rearDate,
        processStatus: search.processStatus,
        data: result.data,
      },
    });
  } else if (result.status === 401) {
    dispatch({ type: EXPIRE_TOKEN });
  } else {
    dispatch({ type: CLEAR_ABSENCES });
  }
};

export const clearAbsences = () => ({ type: CLEAR_ABSENCES });

const initialState = {
  index: 0,
  frontDate: "",
  rearDate: "",
  processStatus: "SUGGESTED",
  data: [],
};

export default function absences(state = initialState, action) {
  switch (action.type) {
    case GET_ABSENCES:
      return {
        index: action.payload.index,
        frontDate: action.payload.frontDate,
        rearDate: action.payload.rearDate,
        processStatus: action.payload.processStatus,
        data: state.data.concat(action.payload.data),
      };
    case CLEAR_ABSENCES:
      return initialState;
    default:
      return state;
  }
}
