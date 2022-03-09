import { combineReducers } from "redux";
import { all } from "redux-saga/effects";

import member from "./member";
import members from "./members";
import token from "./token";
import group from "./group";
import keywords from "./keywords";

const rootReducer = combineReducers({
  token,
  members,
  member,
  group,
  keywords
});

export function* rootSaga() {
  yield all([]);
}

export default rootReducer;
