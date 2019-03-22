import React from "react";
import { Container } from "reactstrap";

import Header from "../components/Header";
import Code from "../components/Code";

import examples from "./examples";

function Demo() {
  return (
    <Container fluid>
      {examples.map(({ id, Component, code = "", ...rest }) => (
        <Header key={id} {...rest}>
          <Code code={code} />
          <Component />
        </Header>
      ))}
    </Container>
  );
}

export default Demo;
