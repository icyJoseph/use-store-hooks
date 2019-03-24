import { INIT, DEVTOOLS } from "./constants";

/**
 *
 * @param {Function} reducer a function which takes state and action to return a next state
 * @param {Object} options options to configure Redux Dev Tools
 * @return {Function} an enhanced reducer, which will send actions and next states to Redux
 * Dev Tools. By default it connects in development and production NODE_ENVs
 */
export const withDevTools = (reducer, options = {}) => {
  const {
    envs = ["development", "production"],
    init = `${DEVTOOLS}/${INIT}`,
    ...rest
  } = options;

  const useDevTools = () =>
    envs.includes(process.env.NODE_ENV) &&
    typeof window !== "undefined" &&
    window.__REDUX_DEVTOOLS_EXTENSION__;

  let extension;
  if (useDevTools()) {
    extension = window.__REDUX_DEVTOOLS_EXTENSION__.connect({ ...rest });
    extension.send(init, reducer(undefined, {}));
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
