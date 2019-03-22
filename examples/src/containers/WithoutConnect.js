import React, { useContext } from "react";
import Squared from "./Squared";
import Counter from "../components/Counter";
import { State } from "../../../src";
import { INC, DEC } from "../ducks/counter";

export function WithoutConnect() {
  const { state: count, dispatch } = useContext(State);
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

export default WithoutConnect;
