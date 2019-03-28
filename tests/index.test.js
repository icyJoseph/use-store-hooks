import React, { useContext } from "react";
import { act } from "react-dom/test-utils";
import { mount } from "enzyme";

import { invokeStore, Provider, State } from "../src";

// Prepare a test scenario
const INC = "inc";
const DEC = "dec";

// define a common reducer
function reducer(count = 0, { type, ...payload }) {
  switch (type) {
    case INC:
      return count + 1;
    case DEC:
      return count - 1;
    default:
      return count;
  }
}

// defined a counter component
function Counter() {
  const { state, dispatch } = useContext(State);
  return (
    <div>
      <span>{state}</span>
      <button onClick={() => dispatch({ type: INC })} />
      <button onClick={() => dispatch({ type: DEC })} />
    </div>
  );
}

// invoke the store
const store = invokeStore(reducer);

const App = () => (
  <Provider store={store}>
    <Counter />
  </Provider>
);

// Run the tests!
describe("React Comp", () => {
  // mount the app
  const app = mount(<App />);

  // find the needed buttons
  const incButton = app.find("button").first();
  const decButton = app.find("button").last();

  it("it is defined", () => {
    expect(app).toBeDefined();
  });

  it("shows count initial state: 0", () => {
    expect(app.find("span").text()).toEqual("0");
  });

  it("updates the counter: + 1", () => {
    act(() => {
      incButton.simulate("click");
    });
    expect(app.find("span").text()).toEqual("1");
  });

  it("updates the counter back to: 0", () => {
    act(() => {
      decButton.simulate("click");
    });
    expect(app.find("span").text()).toEqual("0");
  });

  it("updates the counter: -1", () => {
    act(() => {
      decButton.simulate("click");
    });
    expect(app.find("span").text()).toEqual("-1");
  });
});
