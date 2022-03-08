import { combineReducers } from "redux";
import { all } from "redux-saga/effects";

import member from "./member";
import members from "./members";
import token from "./token";
import group from "./group";

const rootReducer = combineReducers({
  token,
  members,
  member,
  group
});

export function* rootSaga() {
  yield all([]);
}

export default rootReducer;
