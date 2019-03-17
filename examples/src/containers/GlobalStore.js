import React from "react";
import Counter from "../components/Counter";

export function GlobalStoreExample() {
  return <Counter count={0} inc={() => {}} dec={() => {}} />;
}

export default GlobalStoreExample;
