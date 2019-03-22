import React, { useEffect, useState } from "react";
import useMiddleware from "./useMiddleware";
import { INIT } from "./contants";

/**
 *
 * @param {Object} store, consisting of {reducer, initialState, middlewares}
 * @return {Array}  A React Hook, container, which gives state, dispatch and a flag
 * signaling that the store is ready
 */
function useProvider(store) {
  const [state, dispatch] = useMiddleware(store);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    dispatch({ type: INIT });
    setReady(true);
  }, []);

  return [state, dispatch, ready];
}

export default useProvider;
