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
import { Route, Routes, useNavigate } from "react-router-dom";

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
  const navigate = useNavigate();

  console.log(props.currentUser);

  useEffect(() => {
    if (redirectTo) {
      navigate(redirectTo);
      onRedirect();
    }
  }, [redirectTo, onRedirect, navigate]);

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
        <Routes>
          <Route exact path="/" element={<Home/>} />
          <Route path="/login" element={<Login/>} />
          <Route path="/register" element={<Register/>} />
          <PrivateRoute path="/editor/:slug" component={<Editor/>} />
          <PrivateRoute path="/editor" component={<Editor/>} />
          <PrivateRoute path="/item/:id" component={<Item/>} />
          <PrivateRoute path="/settings" component={<Settings/>} />
          <PrivateRoute path="/:username/favorites" component={<ProfileFavorites/>} />
          <PrivateRoute path="/:username" component={<Profile/>} />
        </Routes>
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