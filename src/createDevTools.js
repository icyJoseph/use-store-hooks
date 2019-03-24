const fallback = env => ({
  connect: (...args) => {
    env && console.warn("No DevTools. Failed to connect with: ", args);
    return {
      send: (...args) =>
        env && console.warn("No DevTools. Failed to send: ", args)
    };
  }
});

export const setDevTools = env => {
  const maybeExtension =
    env && typeof window !== "undefined" && window.__REDUX_DEVTOOLS_EXTENSION__;
  return maybeExtension || fallback(env);
};

const defaults = {
  env: true,
  name: "Your App"
};

/**
 *
 * @param {Object} options optional configurations
 * these are whether or not you wish to use the middleware, for example
 * this flag could be true in development but false for production
 * You can also specify a name to display in the Redux Dev Tools
 *
 * @return redux middleware
 */
export const createDevTools = (options = {}) => {
  const config = { ...defaults, ...options };

  const extension = setDevTools(config.env);

  const devTools = extension.connect({
    name: config.name
  });

  return store => next => action => {
    const ret = next(action);
    devTools.send(action.type, store.getState());
    return ret;
  };
};

export default createDevTools;
