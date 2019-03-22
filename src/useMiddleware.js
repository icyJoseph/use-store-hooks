import { useState } from "react";
import compose from "./compose";

/**
 *
 * @param {Object} reducer a function which given a state and an action returns the next state
 * @param {*} initialState the initial state
 * @param {Array} middlewares an array of redux friendly middleware
 * @return {Array} A react Hook which you can consume in other React Function Components
 * the hooks is structured as [state, dispatch]
 */
function useMiddleware({ reducer, initialState, middlewares = [] }) {
  let [state, setState] = useState(initialState);
  let enhancedDispatch;

  const dispatch = action => {
    // mutation trick
    state = reducer(state, action);
    setState(state);
    return action;
  };

  const middlewareAPI = {
    getState: () => state,
    dispatch: (...args) => enhancedDispatch(...args)
  };

  const chain = middlewares.map(middleware => middleware(middlewareAPI));
  enhancedDispatch = compose(...chain)(dispatch);

  return [state, enhancedDispatch];
}

export default useMiddleware;
