import React from "react";
import Counter from "../components/Counter";

export function EnhancersExample() {
  return (
    <section className="example-section">
      <h1 id="enhancers" className="display-4">
        Enhancers
      </h1>
      <p className="lead">
        These components have all independent states. All of them show up in the
        Redux Dev Tools.
      </p>
      <div className="example-container">
        <Counter count={0} inc={() => {}} dec={() => {}} />
      </div>
    </section>
  );
}

export default EnhancersExample;
