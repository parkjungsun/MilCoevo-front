import * as manageApi from "../api/manage";

const GET_GROUP_MEMBERS = "GET_GROUP_MEMBERS";
const CLEAR_GROUP_MEMBERS = "CLEAR_GROUP_MEMBERS";
const EXPIRE_TOKEN = "EXPIRE_TOKEN";

export const getGroupMembers = (token, groupId, search) => async (dispatch) => {
  const result = await manageApi.getGroupMembers(token, groupId, search);
  if (result.status === 200) {
    dispatch({ type: GET_GROUP_MEMBERS, payload: {
        index: result.data.length === 0 ? search.index : search.index + 1,
        searchName: search.searchName,
        data: result.data 
    }});
  } else if (result.status === 401) {
    dispatch({ type: EXPIRE_TOKEN });
  } else {
    dispatch({ type: CLEAR_GROUP_MEMBERS });
  }
};

export const updateGroupMember = (token, groupId, memberId, data) => async (dispatch) => {
    const result = await manageApi.updateGroupMember(token, groupId, memberId, data);
    if (result.status === 200) {
        alert("권한이 변경되었습니다");
    } else if (result.status === 401) {
      dispatch({ type: EXPIRE_TOKEN });
    } else if (result.status === 403) {
      alert("권한이 없습니다");
    } else {
      dispatch({ type: CLEAR_GROUP_MEMBERS });
    }
}

export const banGroupMember = (token, groupId, memberId) => async (dispatch) => {
    const result = await manageApi.banGroupMember(token, groupId, memberId);
    if (result.status === 200) {
      alert("인원을 내보냈습니다");
    } else if (result.status === 401) {
      dispatch({ type: EXPIRE_TOKEN });
    } else if (result.status === 403) {
      alert("권한이 없습니다");
    } else {
      dispatch({ type: CLEAR_GROUP_MEMBERS });
    }
}

export const clearGroupMember = () => ({ type: CLEAR_GROUP_MEMBERS });

const initialState = {
  index: 0,
  searchName: "",
  data: [],
};

export default function groupmember(state = initialState, action) {
  switch (action.type) {
    case GET_GROUP_MEMBERS:
      return {
        index: action.payload.index,
        searchName: action.payload.searchName,
        data: state.data.concat(action.payload.data),
      };
    case CLEAR_GROUP_MEMBERS:
      return initialState;
    default:
      return state;
  }
}
