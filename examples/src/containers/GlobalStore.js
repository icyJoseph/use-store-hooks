import React from "react";
import Squared from "./Squared";
import Counter from "../components/Counter";
import connect from "../../../src/connect";
import { INC, DEC } from "../ducks/counter";

export function GlobalStoreExample({ count, dispatch }) {
  return (
    <div className="multi-demo">
      <Squared />
      <Counter
        count={count}
        inc={() => dispatch({ type: INC })}
        dec={() => dispatch({ type: DEC })}
      />
    </div>
  );
}

export default connect(store => ({ count: store }))(GlobalStoreExample);
