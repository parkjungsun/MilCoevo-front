import React from "react";
import ReactDOM from "react-dom";
import App from "./components/App";
import reportWebVitals from "./reportWebVitals";
import { createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import { Provider } from "react-redux";
import rootReducer, { rootSaga } from "./modules";
import logger from "redux-logger";
import ReduxThunk from "redux-thunk";
import { BrowserRouter } from "react-router-dom";
import { createBrowserHistory } from "history";
import createSagaMiddleware from "redux-saga";

import "./styles/style.scss";
import "./styles/stylePC.scss";
import "./styles/styleM.scss";

const customHistory = createBrowserHistory();
const sagaMiddleware = createSagaMiddleware();

const store = createStore(
  rootReducer,
  composeWithDevTools(
    applyMiddleware(
      ReduxThunk.withExtraArgument({ history: customHistory }),
      sagaMiddleware,
      logger
    )
  )
);

sagaMiddleware.run(rootSaga);

ReactDOM.render(
  <BrowserRouter history={customHistory}>
    <Provider store={store}>
      <App />
    </Provider>
  </BrowserRouter>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
