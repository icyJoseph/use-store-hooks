import React, { useContext } from "react";
import Squared from "./Squared";
import Counter from "../components/Counter";
import GlobalStore from "../../../src/Context";
import { INC, DEC } from "../ducks/counter";

export function WithoutConnect() {
  const { state: count, dispatch } = useContext(GlobalStore);
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
