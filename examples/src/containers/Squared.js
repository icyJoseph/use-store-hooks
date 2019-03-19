import React from "react";
import connect from "../../../src/connect";

export function Squared({ num }) {
  return (
    <div className="example-connected">
      <span className="text-info">{num * num}</span>
      <span className="lead">I am squared!</span>
    </div>
  );
}

export default connect(store => ({ num: store }))(Squared);
