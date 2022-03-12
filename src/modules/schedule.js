import * as schedulesApi from "../api/schedules";

const GET_SCHEDULE = "GET_SCHEDULE";
const CLEAR_SCHEDULE = "CLEAR_SCHEDULE";
const EXPIRE_TOKEN = "EXPIRE_TOKEN";

export const getSchedule = (token, groupId, scheduleId) => async (dispatch) => {
    const result = await schedulesApi.getSchedule(token, groupId, scheduleId);
    if (result.status === 200) {
        dispatch({ type: GET_SCHEDULE, payload: result.data });
    } else if (result.status === 401) {
      dispatch({ type: EXPIRE_TOKEN });
    } else {
      dispatch({ type: CLEAR_SCHEDULE });
    }
};

export const updateSchedule = (token, groupId, scheduleId, data) => async (dispatch) => {
    const result = await schedulesApi.updateSchedule(token, groupId, scheduleId, data);
    if (result.status === 200) {
      dispatch(getSchedule(token, groupId, scheduleId));
    } else if (result.status === 401) {
      dispatch({ type: EXPIRE_TOKEN });
    } else if (result.status === 403){
      alert("권한이 없습니다")
    } else {
      dispatch({ type: CLEAR_SCHEDULE });
    }
}


export const clearSchedule = () => ({ type: CLEAR_SCHEDULE });

const initialState = {};

export default function schedule(state = initialState, action) {
    switch (action.type) {
      case GET_SCHEDULE:
        return action.payload;
      case CLEAR_SCHEDULE:
        return initialState;
      default:
        return state;
    }
  }
  