import React from "react";
import {
  BrowserRouter as Router,
  Link,
  HashRouter,
  Route,
  Redirect,
  Switch,
} from "react-router-dom";
import { useAuth, useAuthAdmin } from "./Components/createAuthProvider";
import "./Assets/Sass/main.scss";
import "semantic-ui-css/semantic.min.css";
import Tables from "./Components/Tables";

import Login from "./Components/Login";
import ListUsers from "./Components/ListUsers";
import LoginAdmin from "./Components/LoginAdmin";

const AuthRoute = (props) => {
  const { logged, type, origin } = props;
  if (type === "private" && !logged) {
    if (origin === "/bet") return <Redirect to="/login" />;
    else if (origin === "/admin1263") return <Redirect to="/loginadmin" />;
  }
  if (logged) {
    if (origin === "/login") return <Redirect to="/bet" />;
    else if (origin === "/loginadmin") return <Redirect to="/admin1263" />;
  }
  return <Route {...props} />;
};

const App = () => {
  const [logged] = useAuth();
  const [loggedAdmin] = useAuthAdmin();

  return (
    <HashRouter >
      <div className="App">
        <Switch>
          <AuthRoute path="/bet" origin="/bet" type="private" logged={logged}>
            <Tables />
          </AuthRoute>
          <AuthRoute path="/login" origin="/login" type="guest" logged={logged}>
            <Login />
          </AuthRoute>
          <AuthRoute path="/admin1263" origin="/admin1263" type="private" logged={loggedAdmin}>
            <ListUsers />
          </AuthRoute>
          <AuthRoute path="/loginadmin" origin="/loginadmin" type="guest" logged={loggedAdmin}>
            <LoginAdmin />
          </AuthRoute>
          <Route render={() => <Redirect to="/login" />} />
        </Switch >
      </div >
    </HashRouter >
  );
};

export default App;
