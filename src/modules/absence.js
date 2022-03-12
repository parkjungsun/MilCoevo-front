import * as absencesApi from "../api/absences";

const GET_ABSENCE = "GET_ABSENCE";
const CLEAR_ABSENCE = "CLEAR_ABSENCE";
const EXPIRE_TOKEN = "EXPIRE_TOKEN";

export const getAbsence = (token, groupId, absenceId) => async (dispatch) => {
    const result = await absencesApi.getAbsence(token, groupId, absenceId);
    if (result.status === 200) {
      dispatch({ type: GET_ABSENCE, payload: result.data });
    } else if (result.status === 401) {
      dispatch({ type: EXPIRE_TOKEN });
    } else {
      dispatch({ type: CLEAR_ABSENCE });
    }
};

export const updateAbsence = (token, groupId, absenceId, data) => async (dispatch) => {
    const result = await absencesApi.updateAbsence(token, groupId, absenceId, data);
    if (result.status === 200) {
      dispatch(getAbsence(token, groupId, absenceId));
    } else if (result.status === 401) {
      dispatch({ type: EXPIRE_TOKEN });
    } else if (result.status === 403){
      alert("권한이 없습니다")
    } else {
      dispatch({ type: CLEAR_ABSENCE });
    }
}

export const clearAbsence = () => ({ type: CLEAR_ABSENCE });

const initialState = {};

export default function schedule(state = initialState, action) {
    switch (action.type) {
      case GET_ABSENCE:
        return action.payload;
      case CLEAR_ABSENCE:
        return initialState;
      default:
        return state;
    }
  }
  