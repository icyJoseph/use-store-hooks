import React, { useEffect, useReducer, useState } from "react";
import State from "./Context";
import compose from "./compose";

function useEnhancer(reducer, initialState, middlewares) {
  let [state, setState] = useState(initialState);
  const dispatch = action => {
    state = reducer(state, action);
    setState(state);
    return action;
  };
  let enhancedDispatch;
  const middlewareAPI = {
    getState: () => state,
    dispatch: (...args) => enhancedDispatch(...args)
  };

  const chain = middlewares.map(middleware => middleware(middlewareAPI));
  enhancedDispatch = compose(...chain)(dispatch);
  return [state, enhancedDispatch];
}

function useProvider(store) {
  const { reducer, initialState, middlewares } = store;
  const [state, dispatch] = useEnhancer(reducer, initialState, middlewares);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    dispatch({ type: "@INIT" });
    setReady(true);
  }, []);

  return [state, dispatch, ready];
}

export function Provider({ store, children }) {
  const [state, dispatch, ready] = useProvider(store);
  return (
    <State.Provider value={{ dispatch, state }}>
      {ready ? children : null}
    </State.Provider>
  );
}

export default Provider;
