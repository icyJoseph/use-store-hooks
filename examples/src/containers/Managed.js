import React, { Component } from "react";
import Counter from "./Counter";
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
