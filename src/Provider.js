import React, { useEffect, useReducer, useState } from "react";
import State from "./Context";
import compose from "./compose";

function useEnhancer({ reducer, initialState, middlewares }) {
  let [state, setState] = useState(initialState);
  let enhancedDispatch;

  const dispatch = action => {
    // mutability trick
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

function useStore({ ...store }) {
  const [state, dispatch] = useEnhancer({ ...store });
  const [ready, setReady] = useState(false);

  useEffect(() => {
    dispatch({ type: "@INIT" });
    setReady(true);
  }, []);

  return [state, dispatch, ready];
}

/**
 *
 * @param {Object} store with reducer, [initialState], and [middlewares]
 * @return {Node} a React Context Wrapper By Provider with dispatch and state
 */
export function Provider({ store, children }) {
  const [state, dispatch, ready] = useStore(store);
  return (
    <State.Provider value={{ dispatch, state }}>
      {ready ? children : null}
    </State.Provider>
  );
}

export default Provider;
