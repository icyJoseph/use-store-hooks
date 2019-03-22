import { INIT } from "./contants";

/**
 *
 * @param {Function} reducer a function which takes state and action to return a next state
 * @param {Object} options options to configure Redux Dev Tools
 * @return {Function} an enhanced reducer, which will send actions and next states to Redux
 * Dev Tools
 */
export const withDevTools = (reducer, options) => {
  const useDevTools = () =>
    process.env.NODE_ENV === "development" &&
    typeof window !== "undefined" &&
    window.__REDUX_DEVTOOLS_EXTENSION__;

  let extension;
  if (useDevTools()) {
    extension = window.__REDUX_DEVTOOLS_EXTENSION__.connect({ ...options });
    extension.send(INIT, reducer(undefined, {}));
  }
  return (state, action) => {
    const nextState = reducer(state, action);
    if (useDevTools()) {
      extension.send(action.type, nextState);
    }
    return nextState;
  };
};

export default withDevTools;
