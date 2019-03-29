import React, { useContext } from "react";
import { mount } from "enzyme";
import { Provider, State, connect, invokeStore } from "../src";

function SocketTitle({ state }) {
  return <div>{state}</div>;
}

const ConnectedTitle = connect()(SocketTitle);
const AlsoConnectedTitle = connect(state => ({ state }))(SocketTitle);

function reducer(state = "Not title") {
  return state;
}

describe("Connect", () => {
  const app = mount(
    <Provider store={invokeStore(reducer)}>
      <ConnectedTitle state={"Title"} />
      <AlsoConnectedTitle />
    </Provider>
  );
  it("is transparent, it can take zero arguments!", () => {
    expect(connect()).toBeDefined();
  });

  it("does not pass anything down to Socket", () => {
    expect(
      app
        .find(ConnectedTitle)
        .find("div")
        .text()
    ).toEqual("Title");
  });

  it("applies mapStateToProps if passed", () => {
    expect(
      app
        .find(AlsoConnectedTitle)
        .find("div")
        .text()
    ).toEqual("Not title");
  });
});
