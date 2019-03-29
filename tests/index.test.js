import React, { useContext } from "react";
import { act } from "react-dom/test-utils";
import { mount } from "enzyme";
import { PROVIDER, INIT } from "../src/constants";
import { invokeStore, Provider, State, connect } from "../src";

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

function CounterSocket({ count, increase, decrease }) {
  return (
    <div>
      <span>{count}</span>
      <button onClick={increase} />
      <button onClick={decrease} />
    </div>
  );
}

const mapStateToProps = state => ({ count: state });
const mapDispatchToProps = dispatch => ({
  increase: () => dispatch({ type: INC }),
  decrease: () => dispatch({ type: DEC })
});

const ConnectedCounter = connect(
  mapStateToProps,
  mapDispatchToProps
)(CounterSocket);

// invoke the store
const store = invokeStore(reducer);

// structure the App
const App = () => (
  <Provider store={store}>
    <Counter />
    <ConnectedCounter />
  </Provider>
);

// Run the tests!
describe("Context/Connected Counter - no middleware", () => {
  // mount the app
  const app = mount(<App />);

  // find the Counter using Context and the Connected Counter
  const counter = app.find(Counter);
  const connectedCounter = app.find(ConnectedCounter);

  // find the Counter buttons
  const counterIncButton = counter.find("button").first();
  const counterDecButton = counter.find("button").last();

  // find the ConnectedCounter buttons
  const connectedCounterIncButton = connectedCounter.find("button").first();
  const connectedCounterDecButton = connectedCounter.find("button").last();

  it("is defined", () => {
    expect(app).toBeDefined();
  });

  it("shows count initial state: 0", () => {
    expect(counter.find("span").text()).toEqual("0");
    expect(connectedCounter.find("span").text()).toEqual("0");
  });

  it("updates the counter: + 1, when using Counter buttons", () => {
    act(() => {
      counterIncButton.simulate("click");
    });
    expect(counter.find("span").text()).toEqual("1");
    expect(connectedCounter.find("span").text()).toEqual("1");
  });

  it("updates the counter back to: 0, when using Counter buttons", () => {
    act(() => {
      counterDecButton.simulate("click");
    });
    expect(counter.find("span").text()).toEqual("0");
    expect(connectedCounter.find("span").text()).toEqual("0");
  });

  it("updates the counter: -1, when using Counter buttons", () => {
    act(() => {
      counterDecButton.simulate("click");
    });
    expect(counter.find("span").text()).toEqual("-1");
    expect(connectedCounter.find("span").text()).toEqual("-1");
  });

  it("updates the counter: +1, when using Connected Counter buttons", () => {
    act(() => {
      connectedCounterIncButton.simulate("click");
    });
    act(() => {
      connectedCounterIncButton.simulate("click");
    });
    expect(counter.find("span").text()).toEqual("1");
    expect(connectedCounter.find("span").text()).toEqual("1");
  });
});

const spy = jest.fn();
let spyDispatch;
const logger = store => next => action => {
  spy(action, store.getState());
  if (action.type === "dec") {
    store.dispatch({ type: "test" });
  }
  return next(action);
};

const Index = () => (
  <Provider store={invokeStore(reducer, undefined, [logger])}>
    <Counter />
  </Provider>
);
describe("Context Counter - with middleware", () => {
  const index = mount(<Index />);

  it("triggers middleware", () => {
    act(() => {
      index
        .find("button")
        .first()
        .simulate("click");
    });

    expect(spy).toHaveBeenCalledWith({ type: `${PROVIDER}/${INIT}` }, 0);
    expect(spy).toHaveBeenCalledWith({ type: "inc" }, 0);
  });

  it("trigger dispatch from middleware", () => {
    act(() => {
      index
        .find("button")
        .last()
        .simulate("click");
    });

    expect(spy).toHaveBeenCalledWith({ type: "test" }, 1);
    expect(spy).toHaveBeenCalledWith({ type: "dec" }, 1);
  });
});
