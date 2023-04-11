// PrivateRoute.js
import React from 'react';
import { Route, Redirect } from 'react-router-dom';

const PrivateRoute = ({ component: Component, currentUser, ...rest }) => {
  return (
    <Route {...rest} render={({ props }) =>
    currentUser ? (
      <Component {...props} />
    ) : (
      <Redirect
        to={{
          pathname: "/login",
          state: { from: props.location }
        }}
      />
    )
  } />
  );
};

export default PrivateRoute;
