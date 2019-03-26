import React from "react";
import { shallow } from "enzyme";
import { compose } from "../src/compose";
describe("Compose", () => {
  const double = a => 2 * a;
  it("composes", () => {
    expect(
      compose(
        double,
        double
      )(2)
    ).toEqual(8);
  });
});

const App = () => <div>Hi</div>;

describe("React Comp", () => {
  it("shallows", () => {
    expect(shallow(<App />)).toBeDefined();
  });
});
