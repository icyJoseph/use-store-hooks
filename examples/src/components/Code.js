import React, { useEffect } from "react";
import prism from "prismjs";
import "../prism.css";

export function Code({ code, language }) {
  useEffect(() => {
    prism.highlightAll();
  }, []);

  return (
    <pre>
      <code className="language-javascript">{code}</code>
    </pre>
  );
}

export default Code;
