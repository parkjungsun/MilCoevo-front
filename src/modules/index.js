import { combineReducers } from "redux";
import { all } from "redux-saga/effects";

import members from "./members";
import token from "./token";

const rootReducer = combineReducers({
  token,
  members
});

export function* rootSaga() {
  yield all([]);
}

export default rootReducer;
