import React from "react";
import { Button, Container, Jumbotron } from "reactstrap";

export function Main() {
  return (
    <Jumbotron fluid>
      <Container fluid>
        <h1 className="display-3">Use Store with Hooks</h1>
        <p className="lead">
          This library mimics Redux's global store using hooks. It also makes it
          simple to enhancer hooks, in order to apply middleware. For example,
          you can use Redux Dev Tools with hooks!
        </p>
        <div className="external-links">
          <Button
            color="primary"
            tag="a"
            href="https://github.com/icyJoseph/useGlobalStore"
            target="_blank"
            rel="noopener noreferrer"
          >
            GitHub
          </Button>
          <Button
            color="info"
            tag="a"
            href="https://www.npmjs.com/package/use-store-hooks"
            target="_blank"
            rel="noopener noreferrer"
          >
            npm
          </Button>
        </div>
      </Container>
    </Jumbotron>
  );
}

export default Main;
