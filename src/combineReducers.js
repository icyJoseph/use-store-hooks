/**
 *
 * @param {Object} reducers an object containing reducers
 * @description applies an action to a group of reducers
 * it also collects any initial state related to the reducer invoked
 * @returns {Object} a combination of reducers
 */
export const combineReducers = reducers => {
  return (state = {}, action) => {
    return Object.keys(reducers).reduce((prev, curr) => {
      const invoke = reducers[curr](state[curr], action);
      return { ...prev, [curr]: invoke };
    }, {});
  };
};

export default combineReducers;
