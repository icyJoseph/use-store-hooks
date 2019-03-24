import React, { useReducer } from "react";
import Counter from "../components/Counter";
import reducer, { INC, DEC } from "../ducks/counter";

// shows in any environment - no flag for process.env.NODE_ENV
const useDevTools =
  typeof window !== "undefined" && window.__REDUX_DEVTOOLS_EXTENSION__;

const withDevTools = reducer => {
  let extension;
  if (useDevTools) {
    extension = window.__REDUX_DEVTOOLS_EXTENSION__.connect({
      name: "React Hook"
    });
    extension.send("@INIT", reducer(undefined, {}));
  }
  return (state, action) => {
    const nextState = reducer(state, action);
    if (useDevTools) {
      extension.send(action.type, nextState);
    }
    return nextState;
  };
};

const enhanced = withDevTools(reducer);
export function ReactHookDevTools() {
  const [count, dispatch] = useReducer(enhanced, 0);
  const inc = () => dispatch({ type: INC });
  const dec = () => dispatch({ type: DEC });

  return <Counter count={count} inc={inc} dec={dec} />;
}

export default ReactHookDevTools;
