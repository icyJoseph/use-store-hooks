import React, { Fragment } from "react";
import ReactDOM from "react-dom";
import { Container } from "reactstrap";

import Header from "./components/Header";
import Navigation from "./components/Navigation";
import Code from "./components/Code";

import Main from "./containers/Main";
import GlobalStore from "./containers/GlobalStore";
import Enhancers from "./containers/Enhancers";
import Managed from "./containers/Managed";

import { managedSrc } from "./code";

import "./index.css";
import "./bootstrap.min.css";

function App() {
  return (
    <Fragment>
      <Navigation />
      <Main />
      <Container>
        <Header
          id="global"
          title="Global Store"
          description="These are connected to a global store."
        >
          <GlobalStore />
        </Header>
        <Header
          id="enhancers"
          title="Enhancers"
          description="These have independent state. These are also connected to Redux dev Tools."
        >
          <Enhancers />
        </Header>
        <Header
          id="managed"
          title="Managed"
          description="This counter uses a React Component, and controls its state using reducers."
        >
          <Code code={managedSrc} />
          <Managed />
        </Header>
      </Container>
    </Fragment>
  );
}

ReactDOM.render(<App />, document.getElementById("root"));
