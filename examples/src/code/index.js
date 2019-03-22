export const globalStoreSrc = `import React from "react";
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

`;

export const withoutConnectSrc = `import React, { useContext } from "react";
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

`;

export const reactComponentSrc = `import React, { Component } from "react";
import Counter from "../components/Counter";
import reducer, { INC, DEC } from "../ducks/counter";

export class Managed extends Component {
  state = {
    count: 0
  };

  dispatch = action => reducer(this.state.count, action);

  increase = () => this.setState({ count: this.dispatch({ type: INC }) });
  decrease = () => this.setState({ count: this.dispatch({ type: DEC }) });

  render() {
    const { count } = this.state;
    return <Counter count={count} inc={this.increase} dec={this.decrease} />;
  }
}

export default Managed;

`;

export const reactComponentDevToolsSrc = `import React, { Component } from "react";
import Counter from "../components/Counter";
import reducer, { INC, DEC } from "../ducks/counter";

const useDevTools =
  process.env.NODE_ENV === "development" &&
  typeof window !== "undefined" &&
  window.__REDUX_DEVTOOLS_EXTENSION__;

export class ManagedDevTools extends Component {
  state = {
    count: 0
  };

  devTools = null;
  extension = null;

  componentDidMount() {
    if (useDevTools) {
      this.extension = window.__REDUX_DEVTOOLS_EXTENSION__;
      this.devTools = this.extension.connect({
        name: "Managed Dev Tools"
      });
      this.devTools.send("@INIT", this.state.count);
    }
  }

  componentWillUnmount() {
    if (useDevTools) {
      this.extension.disconnect();
    }
  }

  dispatch = action => {
    const nextState = reducer(this.state.count, action);
    if (useDevTools) {
      this.devTools.send(action.type, nextState);
    }
    return nextState;
  };

  increase = () => this.setState({ count: this.dispatch({ type: INC }) });
  decrease = () => this.setState({ count: this.dispatch({ type: DEC }) });

  render() {
    const { count } = this.state;
    return <Counter count={count} inc={this.increase} dec={this.decrease} />;
  }
}

export default ManagedDevTools;

`;

export const withDevToolsManually = `import React, { useReducer } from "react";
import Counter from "../components/Counter";
import reducer, { INC, DEC } from "../ducks/counter";

const useDevTools =
  process.env.NODE_ENV === "development" &&
  typeof window !== "undefined" &&
  window.__REDUX_DEVTOOLS_EXTENSION__;

const withDevTools = reducer => {
  let extension;
  if (useDevTools) {
    extension = window.__REDUX_DEVTOOLS_EXTENSION__.connect({
      name: "React Hook"
    });
  }
  extension.send("@INIT", reducer(undefined, {}));
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

`;

export const withDevToolsEnhancerSrc = `import React, { useReducer } from "react";
import Counter from "../components/Counter";
import reducer, { INC, DEC } from "../ducks/counter";
import { withDevTools } from "../../../src/";

const enhanced = withDevTools(reducer, { name: "Enhanced" });

export function ReactHookDevToolsEnhancer() {
  const [count, dispatch] = useReducer(enhanced, 0);
  const inc = () => dispatch({ type: INC });
  const dec = () => dispatch({ type: DEC });

  return <Counter count={count} inc={inc} dec={dec} />;
}

export default ReactHookDevToolsEnhancer;

`;
