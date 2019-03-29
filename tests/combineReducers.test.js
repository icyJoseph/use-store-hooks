import { combineReducers } from "../src";

const ADD = "ADD";
const CHANGE = "CHANGE";
const INIT = "INIT";

function counter(state = 0, action) {
  switch (action.type) {
    case ADD:
      return state + 1;
    default:
      return state;
  }
}

function name(state = "", action) {
  switch (action.type) {
    case CHANGE:
      return action.payload;
    default:
      return state;
  }
}

describe("combineReducers", () => {
  const root = combineReducers({ counter, name });

  it("applies actions to all reducers", () => {
    expect(root(undefined, { type: INIT })).toEqual({ counter: 0, name: "" });
    expect(root({ name: "Test" }, { type: ADD })).toEqual({
      counter: 1,
      name: "Test"
    });
    expect(root({ counter: 10 }, { type: CHANGE, payload: "Testing" })).toEqual(
      {
        counter: 10,
        name: "Testing"
      }
    );
  });
});
