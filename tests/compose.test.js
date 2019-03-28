import { compose } from "../src/compose";

const double = a => 2 * a;
const add = (m, n) => m + n;

describe("Compose", () => {
  it("composes even when the composition takes many arguments", () => {
    const composition = compose(
      double,
      double,
      add
    );
    expect(composition(2, 3)).toEqual(20);
  });

  it("composes for undefined arguments", () => {
    expect(compose()(2)).toEqual(2);
  });
});
