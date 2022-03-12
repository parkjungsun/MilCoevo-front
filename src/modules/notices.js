import * as noticesApi from "../api/notices";

const GET_NOTICES = "GET_NOTICES";
const CLEAR_NOTICES = "CLEAR_NOTICES";
const EXPIRE_TOKEN = "EXPIRE_TOKEN";

export const addNotice = (token, groupId, data) => async (dispatch) => {
  return await noticesApi.addNotice(token, groupId, data);
};

export const getNotices = (token, groupId, search) => async (dispatch) => {
  const result = await noticesApi.getNotices(token, groupId, search);
  if (result.status === 200) {
    dispatch({
        type: GET_NOTICES,
        payload: {
            index: result.data.length === 0 ? search.index : search.index + 1,
            searchTitle: search.searchTitle,
            data: result.data
        }
    });
  } else if (result.status === 401) {
    dispatch({ type: EXPIRE_TOKEN });
  } else {
    dispatch({ type: CLEAR_NOTICES });
  }
};

export const clearNotices = () => ({ type: CLEAR_NOTICES });

const initialState = {
  index: 0,
  searchTitle: "",
  data: [],
};

export default function notices(state = initialState, action) {
  switch (action.type) {
    case GET_NOTICES:
      return {
        index: action.payload.index,
        searchTitle: action.payload.searchTitle,
        data: state.data.concat(action.payload.data),
      };
    case CLEAR_NOTICES:
      return initialState;
    default:
      return state;
  }
}
