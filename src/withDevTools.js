import { INIT, DEVTOOLS } from "./constants";
import { setDevTools } from "./createDevTools";

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

  const envFlag = envs.includes(process.env.NODE_ENV);
  const extension = setDevTools(envFlag);

  const devTools = extension.connect({ ...rest });
  devTools.send(init, reducer(undefined, {}));
  return (state, action) => {
    const nextState = reducer(state, action);
    devTools.send(action.type, nextState);
    return nextState;
  };
};

export default withDevTools;
