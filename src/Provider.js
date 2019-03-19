import React, { useEffect, useReducer, useState } from "react";
import State from "./Context";

function useProvider(store) {
  const { reducer, initialState } = store;
  const [state, dispatch] = useReducer(reducer, initialState);
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
