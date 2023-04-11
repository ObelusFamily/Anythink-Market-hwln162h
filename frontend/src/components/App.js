import agent from "../agent";
import Header from "./Header";
import React, { useEffect } from "react";
import { connect } from "react-redux";
import { APP_LOAD, REDIRECT } from "../constants/actionTypes";
import Item from "./Item";
import Editor from "./Editor";
import Home from "./Home";
import Login from "./Login";
import Profile from "./Profile";
import ProfileFavorites from "./ProfileFavorites";
import Register from "./Register";
import Settings from "./Settings";
import PrivateRoute from "./PrivateRoute";
import { Route, Switch, useHistory } from "react-router-dom";

const mapStateToProps = (state) => {
  return {
    appLoaded: state.common.appLoaded,
    appName: state.common.appName,
    currentUser: state.common.currentUser,
    redirectTo: state.common.redirectTo,
  };
};

const mapDispatchToProps = (dispatch) => ({
  onLoad: (payload, token) =>
    dispatch({ type: APP_LOAD, payload, token, skipTracking: true }),
  onRedirect: () => dispatch({ type: REDIRECT }),
});

const App = (props) => {
  const { redirectTo, onRedirect, onLoad } = props;
  const history = useHistory();

  useEffect(() => {
    if (redirectTo) {
      history.push(redirectTo);
      onRedirect();
    }
  }, [redirectTo, onRedirect, history]);

  useEffect(() => {
    const token = window.localStorage.getItem("jwt");
    if (token) {
      agent.setToken(token);
    }
    onLoad(token ? agent.Auth.current() : null, token);
  }, [onLoad]);

  if (props.appLoaded) {
    return (
      <div>
        <Header
          appName={props.appName}
          currentUser={props.currentUser}
        />
        <Switch>
          <Route exact path="/" component={Home}/>
          <Route path="/login" component={Login}/>
          <Route path="/register" component={Register}/>
          <PrivateRoute currentUser={props.currentUser} component={Editor} path="/editor/:slug"/>
          <PrivateRoute currentUser={props.currentUser} component={Editor} path="/editor"/>
          <PrivateRoute currentUser={props.currentUser} component={Item} path="/item/:id"/>
          <PrivateRoute currentUser={props.currentUser} component={Settings} path="/settings"/>
          <PrivateRoute currentUser={props.currentUser} component={ProfileFavorites} path="/:username/favorites"/>
          <PrivateRoute currentUser={props.currentUser} component={Profile} path="/:username"/>
        </Switch>
      </div>
    );
  }
  return (
    <div>
      <Header
        appName={props.appName}
        currentUser={props.currentUser}
      />
    </div>
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(App);