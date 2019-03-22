/**
 * @description Does a dry run to extract the initial state in case it was not defined
 * @param {Function} reducer a function which takes a current state and an action
 * @param {*} storeInit optional initial state
 * @param {Array} middlewares  an array of redux friendly middleware
 * Redux friendly middleware consume dispatch, and getState, and has a minimal signature of
 * store => next => action => next(action)
 * @return {Object} container the reducer, a formal initialState and the middleware
 */
export function invokeStore(reducer, storeInit, middlewares = []) {
  // if the initial state is given, take it,
  // otherwise do a dry run
  const initialState = storeInit || reducer(undefined, {});

  return { reducer, initialState, middlewares };
}

export default invokeStore;
