// demo components
import GlobalStore from "../containers/GlobalStore";
import ReactComponent from "../containers/ReactComponent";
import ReactComponentDevTools from "../containers/ReactComponentDevTools";
import WithoutConnect from "../containers/WithoutConnect";
import ReactHookDevTools from "../containers/ReactHooksDevTools";
import ReactHookDevToolsEnhancer from "../containers/ReactHooksDevToolsEnhancer";

import {
  globalStoreSrc,
  withoutConnectSrc,
  reactComponentSrc,
  reactComponentDevToolsSrc,
  withDevToolsManually,
  withDevToolsEnhancerSrc
} from "../code";

export const examples = [
  {
    id: "global",
    title: "Global Store",
    description: "These are connected to a global store.",
    code: globalStoreSrc,
    Component: GlobalStore
  },
  {
    id: "withoutconnect",
    title: "Without Connect",
    description:
      "These are connected to a global store, without a connect helper.",
    code: withoutConnectSrc,
    Component: WithoutConnect
  },
  {
    id: "hookEnhancerDevTools",
    title: "useReducer + Dev Tools",
    description:
      "This useReducer hook uses Redux Dev Tools through a helper function.",
    code: withDevToolsEnhancerSrc,
    Component: ReactHookDevToolsEnhancer
  },
  {
    id: "hookDevTools",
    title: "useReducer + Dev Tools",
    description: "This useReducer hook uses Redux Dev Tools.",
    code: withDevToolsManually,
    Component: ReactHookDevTools
  },
  {
    id: "managed",
    title: "Managed",
    description:
      "This counter uses a React Component, and controls its state using reducers.",
    code: reactComponentSrc,
    Component: ReactComponent
  },
  {
    id: "managedDevTools",
    title: "Managed Dev Tools",
    description:
      "This counter uses a React Component, and controls its state using reducers. And it is connected to Redux Dev Tools.",
    code: reactComponentDevToolsSrc,
    Component: ReactComponentDevTools
  }
];

export default examples;
