import React from "react";
import { act } from "react-dom/test-utils";
import { mount } from "enzyme";
import { useMiddleware } from "../src";

function reducer(state = 0, action) {
  if (action.type === "inc") {
    return state + 1;
  }
  return state;
}

function Counter() {
  const [state, dispatch] = useMiddleware({ reducer, initialState: 0 });

  return <div onClick={() => dispatch({ type: "inc" })}>{state}</div>;
}

describe("useMiddleware", () => {
  const app = mount(<Counter />);

  it("does work, without middleware", () => {
    expect(app.find("div").text()).toEqual("0");
  });

  it("does dispatch, without middleware", () => {
    act(() => {
      app.find("div").simulate("click");
    });
    expect(app.find("div").text()).toEqual("1");
  });
});
