import React, { Fragment } from "react";
import ReactDOM from "react-dom";
import { Container } from "reactstrap";

import Main from "./containers/Main";
import Navigation from "./containers/Navigation";
import GlobalStore from "./containers/GlobalStore";
import Enhancers from "./containers/Enhancers";
import Managed from "./containers/Managed";

import "./index.css";
import "./bootstrap.min.css";

function App() {
  return (
    <Fragment>
      <Navigation />
      <Main />
      <Container>
        <GlobalStore />
        <Enhancers />
        <Managed />
      </Container>
    </Fragment>
  );
}

ReactDOM.render(<App />, document.getElementById("root"));
