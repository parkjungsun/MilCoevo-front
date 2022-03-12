import * as noticesApi from "../api/notices";

const GET_NOTICE = "GET_NOTICE";
const ADD_COMMENT = "ADD_COMMENT";
const DEL_COMMENT = "DEL_COMMENT";
const CLEAR_NOTICE = "CLEAR_NOTICE";
const EXPIRE_TOKEN = "EXPIRE_TOKEN";

export const getNotice = (token, groupId, noticeId) => async (dispatch) => {
  const result = await noticesApi.getNotice(token, groupId, noticeId);
  if (result.status === 200) {
    dispatch({ type: GET_NOTICE, payload: result.data });
  } else if (result.status === 401) {
    dispatch({ type: EXPIRE_TOKEN });
  } else {
    dispatch({ type: CLEAR_NOTICE });
  }
};

export const delNotice = (token, groupId, noticeId) => async (dispatch) => {
  return await noticesApi.delNotice(token, groupId, noticeId);
};

export const delComment =
  (token, groupId, noticeId, commentId) => async (dispatch) => {
    const result = await noticesApi.delComment(
      token,
      groupId,
      noticeId,
      commentId
    );
    if (result.status === 200) {
      dispatch({ type: DEL_COMMENT, payload: commentId });
    } else if (result.status === 401) {
      dispatch({ type: EXPIRE_TOKEN });
    } else {
      dispatch({ type: CLEAR_NOTICE });
    }
  };

export const addComment =
  (token, groupId, noticeId, data) => async (dispatch) => {
    const result = await noticesApi.addComment(token, groupId, noticeId, data);
    if (result.status === 201) {
      dispatch({
        type: ADD_COMMENT,
        payload: {
          id: result.data,
          content: data.comment,
          email: data.email,
          position: data.position,
          nickname: data.nickname,
        },
      });
    } else if (result.status === 401) {
      dispatch({ type: EXPIRE_TOKEN });
    } else {
      dispatch({ type: CLEAR_NOTICE });
    }
  };

export const clearNotice = () => ({ type: CLEAR_NOTICE });

const initialState = {};

export default function notice(state = initialState, action) {
  switch (action.type) {
    case GET_NOTICE:
      return action.payload;
    case ADD_COMMENT:
      return {
        ...state,
        comments: state.comments.concat(action.payload),
      };
    case DEL_COMMENT:
      return {
          ...state,
          comments: state.comments.filter((i) => i.id !== action.payload)
      }
    case CLEAR_NOTICE:
      return initialState;
    default:
      return state;
  }
}
