import React from "react";
import { Button } from "reactstrap";

export function Counter({ count, inc, dec }) {
  return (
    <div className="example-counter">
      <div>
        <span className="text-primary">{count}</span>
      </div>
      <div>
        <Button onClick={inc}>+1</Button>
        <Button onClick={dec}>-1</Button>
      </div>
    </div>
  );
}

export default Counter;
