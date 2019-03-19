import React, { useContext } from "react";
import State from "./Context";

const connect = (mapState = () => {}, mapDispatch = () => {}) => {
  return ConnectedComponent => {
    return () => {
      const { state, dispatch } = useContext(State);

      return (
        <ConnectedComponent
          {...mapState(state)}
          {...mapDispatch(dispatch)}
          dispatch={dispatch}
        />
      );
    };
  };
};

export default connect;
