export const combineReducers = reducer => {
  return (state = {}, action) => {
    return Object.keys(reducer).reduce((prev, curr) => {
      const invoke = reducer[curr](state[curr], action);
      return { ...prev, [curr]: invoke };
    }, {});
  };
};

export default combineReducers;
