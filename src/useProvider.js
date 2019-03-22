import React, { useEffect, useState } from "react";
import useMiddleware from "./useMiddleware";
import { INIT } from "./contants";

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
