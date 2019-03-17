import React from "react";
import Counter from "../components/Counter";

export function GlobalStoreExample() {
  return (
    <section className="example-section">
      <h1 id="global" className="display-4">
        Global Store
      </h1>
      <div>
        <p className="lead">
          These components are all connected to a global store.
        </p>
      </div>
      <div className="example-container">
        <Counter count={0} inc={() => {}} dec={() => {}} />
      </div>
    </section>
  );
}

export default GlobalStoreExample;
