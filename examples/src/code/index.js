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
      this.devTools.send("@INIT", this.state);
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
