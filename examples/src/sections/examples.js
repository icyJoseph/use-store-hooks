// demo components
import GlobalStore from "../containers/GlobalStore";
import ReactComponent from "../containers/ReactComponent";
import ReactComponentDevTools from "../containers/ReactComponentDevTools";
import WithoutConnect from "../containers/WithoutConnect";
import ReactHookDevTools from "../containers/ReactHooksDevTools";
import ReactHookDevToolsEnhancer from "../containers/ReactHooksDevToolsEnhancer";

import { reactComponentSrc, reactComponentDevToolsSrc } from "../code";

export const examples = [
  {
    id: "global",
    title: "Global Store",
    description: "These are connected to a global store.",
    Component: GlobalStore
  },
  {
    id: "withoutconnect",
    title: "Without Connect",
    description:
      "These are connected to a global store, without a connect helper.",
    Component: WithoutConnect
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
  },
  {
    id: "hookDevTools",
    title: "useReducer + Dev Tools",
    description: "This useReducer hook uses Redux Dev Tools.",
    Component: ReactHookDevTools
  },
  {
    id: "hookEnhancerDevTools",
    title: "useReducer + Dev Tools",
    description:
      "This useReducer hook uses Redux Dev Tools through a helper function.",
    Component: ReactHookDevToolsEnhancer
  }
];

export default examples;
