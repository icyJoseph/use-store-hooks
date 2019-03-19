import React, { useReducer } from "react";
import Counter from "../components/Counter";
import reducer, { INC, DEC } from "../ducks/counter";
import { withDevTools } from "../../../src/enhancers";

const enhanced = withDevTools(reducer, { name: "Enhanced" });

export function ReactHookDevToolsEnhancer() {
  const [count, dispatch] = useReducer(enhanced, 0);
  const inc = () => dispatch({ type: INC });
  const dec = () => dispatch({ type: DEC });

  return <Counter count={count} inc={inc} dec={dec} />;
}

export default ReactHookDevToolsEnhancer;
