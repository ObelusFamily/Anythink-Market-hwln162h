// PrivateRoute.js
import React from 'react';
import { Route, Redirect } from 'react-router-dom';

const PrivateRoute = ({ children, currentUser, ...rest }) => {
  return (
    <Route {...rest} render={({ location }) =>
    currentUser !== null ? (
      children
    ) : (
      <Redirect
        to={{
          pathname: "/login",
          state: { from: location }
        }}
      />
    )
  } />
  );
};

export default PrivateRoute;
