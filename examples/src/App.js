import React from "react";

import { createLogger } from "redux-logger";
import { Provider, invokeStore, createDevTools } from "../../src/";

import Main from "./sections/Main";
import Demo from "./sections/Demo";

import reducer from "../src/ducks/counter";

// on the fly make middleware out of devTools
const withDevTools = () => {
  const extension = window.__REDUX_DEVTOOLS_EXTENSION__;
  const devTools = extension
    ? extension.connect({
        name: "Root"
      })
    : { send: () => {} };
  return store => next => action => {
    const ret = next(action);
    devTools.send(action.type, store.getState());
    return ret;
  };
};

// invoke logger middleware
const logger = createLogger();

// invoke dev tools middleware
const devTools = createDevTools();

// configure store
const store = invokeStore(reducer, undefined, [
  logger,
  withDevTools(),
  devTools
]);

// Compose Demo and Main wrapped by our Provider
function App() {
  return (
    <Provider store={store}>
      <Main />
      <Demo />
    </Provider>
  );
}

export default App;
