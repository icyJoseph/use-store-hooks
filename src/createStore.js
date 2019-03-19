export function createStore(reducer, storeInit, enhancer) {
  // if the initial state is given, take it,
  // otherwise do a dry run
  const initialState = storeInit || reducer(undefined, {});

  if (enhancer) {
    return enhancer(createStore)(reducer, initialState);
  }

  return { reducer, initialState };
}

export default createStore;
