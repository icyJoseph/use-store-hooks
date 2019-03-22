import React, { useContext } from "react";
import State from "./State";

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
