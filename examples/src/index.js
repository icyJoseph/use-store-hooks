import React, { Fragment } from "react";
import ReactDOM from "react-dom";
import { Container } from "reactstrap";

import Header from "./components/Header";
import Navigation from "./components/Navigation";
import Code from "./components/Code";

import Main from "./containers/Main";
import GlobalStore from "./containers/GlobalStore";
import Enhancers from "./containers/Enhancers";
import ReactComponent from "./containers/ReactComponent";
import ReactComponentDevTools from "./containers/ReactComponentDevTools";

import { reactComponentSrc, reactComponentDevToolsSrc } from "./code";

import "./index.css";
import "./bootstrap.min.css";
import { ReactHookDevTools } from "./containers/ReactHooksDevTools";

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
          <Code code={reactComponentSrc} />
          <ReactComponent />
        </Header>
        <Header
          id="managedDevTools"
          title="Managed Dev Tools"
          description="This counter uses a React Component, and controls its state using reducers. And it is connected to Redux Dev Tools."
        >
          <Code code={reactComponentDevToolsSrc} />
          <ReactComponentDevTools />
        </Header>
      </Container>
      <Header
        id="hookDevTools"
        title="Hooks with Redux Dev Tools"
        description="This useReducer hook uses Redux Dev Tools"
      >
        <ReactHookDevTools />
      </Header>
    </Fragment>
  );
}

ReactDOM.render(<App />, document.getElementById("root"));
