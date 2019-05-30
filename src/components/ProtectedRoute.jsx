import React from "react";
import { Route, Redirect } from "react-router-dom";

export function ProtectedRoute({ render, ...rest }) {
  let incomingRender = render;
  return (
    <Route
      {...rest}
      render={props => {
        return rest.loggedIn ? incomingRender(props) : <Redirect to="/login" />;
      }}
    />
  );
}
