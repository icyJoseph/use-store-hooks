# use-store-hooks

Create a redux-like store using hooks. Supports middleware.

Demo available [here](https://rare-channel.surge.sh/).

## Motivation

Redux is a very powerful concept. This document aims to share how one could still use the concept without having to ever install `redux` and `react-redux`.

In addition, this package provides a bunch of methods to setup a redux-like global store, which connects to Redux Dev Tools and also consumes middleware!

## How to use?

1. Invoke a store

```jsx
const store = invokeStore(reducer);
```

Unlike createStore, this method simply does a dry run of your reducer to get the initial state. Optionally, `invokeStore` can take an `initialState` as second parameters.

If you wish to apply middleware, `invokeStore` takes them as third argument. Middleware must be an array of redux valid middlewares.

> Enhancers are not supported!

2. Wrap your React tree with `<Provider>`

```jsx
function App() {
  return (
    <Provider store={store}>
      <Counter />
    </Provider>
  );
```

3. Consume the store

This is where this library is fundamentally different than `redux` and `react-redux`.

You have two options:

### Connect

This library exposes `connect` which behaves almost like `react-redux`'s. The main difference is that the second parameter to connect should always be a function!

```jsx
export function GlobalStoreExample({ count, dispatch }) {
  return (
    <Counter
      count={count}
      inc={() => dispatch({ type: INC })}
      dec={() => dispatch({ type: DEC })}
    />
  );
}

export default connect(store => ({ count: store }))(GlobalStoreExample);
```

This is a slightly annoying method, which involves Higher Order Components. Sometimes testing these is cumbersome.

> `connect` can take zero, one or two arguments!
> `connect` passes dispatch down to `GlobalStoreExample`

### useContext

React 16.1, exposes the `useContext` API.

```jsx
import React, { useContext } from "react";
import Counter from "../components/Counter";
import { State } from "use-global-store";
import { INC, DEC } from "../ducks/counter";

export function WithoutConnect() {
  const { state: count, dispatch } = useContext(State);
  return (
    <Counter
      count={count}
      inc={() => dispatch({ type: INC })}
      dec={() => dispatch({ type: DEC })}
    />
  );
}

export default WithoutConnect;
```

This is a much better approach, as it isolates completely the component from external props. The benefits of using context are already well known.

> Notice how `WithoutConnect` does not need defined arguments!

## Why?

You could've set this up yourself, what is the big gain?

> This library has no additional dependencies other than React 16.1+ being present in your project!

The biggest gain is the possiblity to use middleware. The idea is to enable this anywhere in your application.

For example, Redux Dev Tools is a good extension to debug your React-Redux applications, but it relies on enhancer, how could you still use it in your application?

Let's say you have a React component. Notice that this class component has been structured in such a way that it dispatches actions to a reducer, which updates the state. Redux is a way of coding, not just a library!

```jsx
import React, { Component } from "react";
import Counter from "../components/Counter";
import reducer, { INC, DEC } from "../ducks/counter";

export class Managed extends Component {
  state = {
    count: 0
  };

  dispatch = action => reducer(this.state.count, action);

  increase = () => this.setState({ count: this.dispatch({ type: INC }) });
  decrease = () => this.setState({ count: this.dispatch({ type: DEC }) });

  render() {
    const { count } = this.state;
    return <Counter count={count} inc={this.increase} dec={this.decrease} />;
  }
}
```

In order to use it you'd have set your component as shown here:

```jsx
import React, { Component } from "react";
import Counter from "../components/Counter";
import reducer, { INC, DEC } from "../ducks/counter";

const useDevTools =
  process.env.NODE_ENV === "development" &&
  typeof window !== "undefined" &&
  window.__REDUX_DEVTOOLS_EXTENSION__;

export class ReactComponentDevTools extends Component {
  state = {
    count: 0
  };

  devTools = null;
  extension = null;

  componentDidMount() {
    if (useDevTools) {
      this.extension = window.__REDUX_DEVTOOLS_EXTENSION__;
      this.devTools = this.extension.connect({
        name: "Managed Dev Tools"
      });
      this.devTools.send("@INIT", this.state.count);
    }
  }

  componentWillUnmount() {
    if (useDevTools) {
      this.extension.disconnect();
    }
  }

  dispatch = action => {
    const nextState = reducer(this.state.count, action);
    if (useDevTools) {
      this.devTools.send(action.type, nextState);
    }
    return nextState;
  };

  increase = () => this.setState({ count: this.dispatch({ type: INC }) });
  decrease = () => this.setState({ count: this.dispatch({ type: DEC }) });

  render() {
    const { count } = this.state;
    return <Counter count={count} inc={this.increase} dec={this.decrease} />;
  }
}

export default ReactComponentDevTools;
```

Now your component reports to Redux Dev Tools. However it is now much more verbose!

Instead, you could just use `withDevTools`, which enhancers your reducer.

```jsx
import React, { useReducer } from "react";
import Counter from "../components/Counter";
import reducer, { INC, DEC } from "../ducks/counter";
import { withDevTools } from "../../../src/";

const enhanced = withDevTools(reducer, { name: "Enhanced" });

export function ReactHookDevToolsEnhancer() {
  const [count, dispatch] = useReducer(enhanced, 0);
  const inc = () => dispatch({ type: INC });
  const dec = () => dispatch({ type: DEC });

  return <Counter count={count} inc={inc} dec={dec} />;
}

export default ReactHookDevToolsEnhancer;
```

And now your the `Counter` state is up in the Redux Dev Tools.

You can also make local redux store which connects wraps a section of your application.

```jsx
import React, { useReducer } from "react";
import Counter from "../components/Counter";
import reducer, { INC, DEC } from "../ducks/counter";
import {
  useMiddleware,
  useProvider,
  createDevTools,
  invokeStore
} from "../../../src/";

// You define your own Context
import CustomContext from "./YourCustomContext";

const middlewares = [createDevTools({ name: "Local Redux" })];
const store = invokeStore(reducer, undefined, middlewares);

export function LocalRedux({ children }) {
  const [state, dispatch, ready] = useProvider(store);

  return (
    <CustomContext.Provider value={{ dispatch, state }}>
      {ready ? children : null}
    </CustomContext.Provider>
  );
}

export default LocalRedux;
```

Further down the three just invoke `useContext` and pass your `CustomContext` as argument!

## API

These are the API's exposed by the package.

### `invokeStore`

This function takes three arguments.

- reducer
- initialState - optional
- middlewares - array of middlewares - optional

```js
const store = invokeStore(reducer, undefined, undefined);
```

### `Provider`

React-like node, which takes a store as single prop!

```jsx
const App = () => (
  <Provider store={store}>
    <AwesomeApp />
  </Provider>
);
```

### `connect`

React-Redux like function. Takes two arguments, `mapStateToProps` and `mapDispatchToProps` to props. Both must be functions! Both could also be undefined.

It returns a Wrapper, which can consume a React Component. The Wrapper passes `props` and the results of `mapStateToProps(state, props)` and `mapDispatchToProps(dispatch, props)` as props to the React Component.

This connect function also passes dispatch down to the React Component.

```js
export default connect(
  store => ({ store }),
  dispatch => ({ inc: () => dispatch({ type: INC }) })
)(Counter);
```

> Eventually you should move away from `connect`!

### `State`

The actual global state. To move away from `connect` import this instead, and pass it to `useContext` from React's main API.

> `useContext` returns an object!

In this case:

```js
const { state, dispatch } = useContext(State);
```

### `createDevTools`

Easily setup dev tools as middleware by invoking this function. It optionally takes an object, with an environment flag, and a name to be used in the dev tools extension.

The environment flag, could simply be whether or not you are in development environment.

```js
const devTools = createDevTools({
  env: process.env.NODE_ENV === "development",
  name: "Wow"
});
```

### `useProvider`

Given a store:

```js
const store = { reducer, initialState, middlewares };
```

Returns the state of the store, a dispatcher and whether or not the store is ready to be used!

```js
function Main() {
  const [state, dispatch, ready] = useProvider(store);
  return [state, dispatch, ready];
}
```

### `useMiddleware`

Takes a store of shape:

```js
const store = { reducer, initialState, middlewares };
```

Returns a `state` and `enhanceDispatch`, which runs throught the middleware!

```js
function Main() {
  const [state, enhancedDispatch] = useMiddleware(store);
  return [state, enhancedDispatch];
}
```

### `combineReducers`

If you have more than one reducer, you can make a plain object out of them and pass it to combineReducers. The result is your `rootReducer` and what you should pass to `invokeStore`.

```js
const rootReducer = combineReducers({
  auth,
  counter,
  uiState
});

const store = invokeStore(rootReducer);
```

### `compose`

Naive implementation.

```js
const double = x => x * 2;

console.log(
  compose(
    double,
    double
  )(2) === double(double(2))
); // true
```
