import React, { useEffect, useReducer, useState } from "react";
import State from "./Context";
import compose from "./compose";

function useProvider(store) {
  const { reducer, initialState, middlewares } = store;
  const [state, preDispatch] = useReducer(reducer, initialState);
  const [ready, setReady] = useState(false);

  const middlewareAPI = {
    getState: () => state,
    dispatch: (...args) => dispatch(...args)
  };

  const chain = middlewares.map(middleware => middleware(middlewareAPI));
  const dispatch = compose(...chain)(preDispatch);

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
