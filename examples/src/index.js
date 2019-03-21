import React, { Fragment } from "react";
import ReactDOM from "react-dom";
import { Container } from "reactstrap";

import Provider from "../../src/Provider";
import createStore from "../../src/createStore";
import reducer from "../src/ducks/counter";

import Header from "./components/Header";
import Navigation from "./components/Navigation";
import Code from "./components/Code";

import Main from "./containers/Main";
import GlobalStore from "./containers/GlobalStore";
import Enhancers from "./containers/Enhancers";
import ReactComponent from "./containers/ReactComponent";
import ReactComponentDevTools from "./containers/ReactComponentDevTools";

import { reactComponentSrc, reactComponentDevToolsSrc } from "./code";

import ReactHookDevTools from "./containers/ReactHooksDevTools";
import ReactHookDevToolsEnhancer from "./containers/ReactHooksDevToolsEnhancer";

import "./index.css";
import "./bootstrap.min.css";

const store = createStore(reducer, undefined, [
  store => next => action => {
    console.log(store.getState());
    const ret = next(action);
    console.log(store.getState());
    return ret;
  }
]);

function App() {
  return (
    <Provider store={store}>
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
    </Provider>
  );
}

ReactDOM.render(<App />, document.getElementById("root"));
