import React, { Component } from "react";
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
    return (
      <section className="example-section">
        <h1 id="managed" className="display-4">
          Managed
        </h1>
        <div>
          <p className="lead">
            This counter uses a React Component, and controls its state using
            reducers.
          </p>
        </div>
        <div className="example-container">
          <Counter count={count} inc={this.increase} dec={this.decrease} />
        </div>
      </section>
    );
  }
}

export default Managed;
