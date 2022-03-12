import * as schedulesApi from "../api/schedules";

const GET_SCHEDULES = "GET_SCHEDULES";
const CLEAR_SCHEDULES = "CLEAR_SCHEDULES";
const EXPIRE_TOKEN = "EXPIRE_TOKEN";

export const addSchedule = (token, groupId, data) => async (dispatch) => {
  return await schedulesApi.addSchedule(token, groupId, data);
};

export const getSchedules = (token, groupId, search) => async (dispatch) => {
  const result = await schedulesApi.getSchedules(token, groupId, search);
  if (result.status === 200) {
    dispatch({ type: GET_SCHEDULES, payload: {
        index: search.index + 1,
        frontDate: search.frontDate,
        rearDate: search.rearDate,
        processStatus: search.processStatus,
        data: result.data
    } });
  } else if (result.status === 401) {
    dispatch({ type: EXPIRE_TOKEN });
  } else {
    dispatch({ type: CLEAR_SCHEDULES });
  }
};

export const clearSchedules = () => ({ type: CLEAR_SCHEDULES });

const initialState = {
  index: 0,
  frontDate: "",
  rearDate: "",
  processStatus: "SUGGESTED",
  data: [],
};

export default function schedules(state = initialState, action) {
  switch (action.type) {
    case GET_SCHEDULES:
      return {
        index: action.payload.index,
        frontDate: action.payload.frontDate,
        rearDate: action.payload.rearDate,
        processStatus: action.payload.processStatus,
        data: state.data.concat(action.payload.data)
      };
    case CLEAR_SCHEDULES:
      return initialState;
    default:
      return state;
  }
}
