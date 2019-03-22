import { useState } from "react";
import compose from "./compose";

function useMiddleware({ reducer, initialState, middlewares }) {
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
