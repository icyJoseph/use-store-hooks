import React from "react";
import State from "./State";
import useProvider from "./useProvider";

/**
 *
 * @param {Object} store with reducer, [initialState], and [middlewares]
 * @return {Node} a React Context Wrapper By State.Provider with dispatch and state
 */
export function Provider({ store, children }) {
  const [state, dispatch, ready] = useProvider(store);
  return (
    <State.Provider value={{ dispatch, state }}>
      {ready ? children : null}
    </State.Provider>
  );
}

export default Provider;
