import React, { useContext } from "react";
import State from "./State";

/**
 *
 * @param {Function} mapState takes the state and own props
 * @param {Function} mapDispatch takes dispatch and current props
 * @return {Node} A react component with additional props
 */
const connect = (mapState = () => {}, mapDispatch = () => {}) => {
  return ConnectedComponent => {
    return ({ ...props }) => {
      const { state, dispatch } = useContext(State);

      return (
        <ConnectedComponent
          {...props}
          {...mapState(state, props)}
          {...mapDispatch(dispatch, props)}
          dispatch={dispatch}
        />
      );
    };
  };
};

export default connect;
