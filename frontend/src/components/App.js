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
          <Route exact path="/"><Home/></Route>
          <Route path="/login"><Login/></Route>
          <Route path="/register"><Register/></Route>
          <PrivateRoute currentUser={props.currentUser} path="/editor/:slug"><Editor/></PrivateRoute>
          <PrivateRoute currentUser={props.currentUser} path="/editor"><Editor/></PrivateRoute>
          <PrivateRoute currentUser={props.currentUser} path="/item/:id"><Item/></PrivateRoute>
          <PrivateRoute currentUser={props.currentUser} path="/settings"><Settings/></PrivateRoute>
          <PrivateRoute currentUser={props.currentUser} path="/:username/favorites"><ProfileFavorites/></PrivateRoute>
          <PrivateRoute currentUser={props.currentUser} path="/:username"><Profile/></PrivateRoute>
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