export function createStore(reducer, storeInit, middlewares = []) {
  // if the initial state is given, take it,
  // otherwise do a dry run
  const initialState = storeInit || reducer(undefined, {});

  return { reducer, initialState, middlewares };
}

export default createStore;
