import React from "react";
import { Container } from "reactstrap";

import Header from "../components/Header";
import Code from "../components/Code";

import Main from "./Main";
import GlobalStore from "../containers/GlobalStore";
import ReactComponent from "../containers/ReactComponent";
import ReactComponentDevTools from "../containers/ReactComponentDevTools";
import WithoutConnect from "../containers/WithoutConnect";

import ReactHookDevTools from "../containers/ReactHooksDevTools";
import ReactHookDevToolsEnhancer from "../containers/ReactHooksDevToolsEnhancer";

import { reactComponentSrc, reactComponentDevToolsSrc } from "../code";

function Demo() {
  return (
    <Container>
      <Header
        id="global"
        title="Global Store"
        description="These are connected to a global store."
      >
        <GlobalStore />
      </Header>
      <Header
        id="withoutconnect"
        title="Without Connect"
        description="These are connected to a global store, without a connect helper."
      >
        <WithoutConnect />
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
      <Header
        id="hookDevTools"
        title="useReducer + Dev Tools"
        description="This useReducer hook uses Redux Dev Tools."
      >
        <ReactHookDevTools />
      </Header>
      <Header
        id="hookEnhancerDevTools"
        title="useReducer + Dev Tools"
        description="This useReducer hook uses Redux Dev Tools through a helper function."
      >
        <ReactHookDevToolsEnhancer />
      </Header>
    </Container>
  );
}

export default Demo;
