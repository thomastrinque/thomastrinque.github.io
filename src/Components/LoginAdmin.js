import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { Card, Form, Input, Button } from "./AuthForm.style";
import { useAuth, authFetch, login, loginAdmin, logout } from "./createAuthProvider";

const apiClient = "http://176.58.105.174:3000";

const LoginAdmin = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleUsername = (name) => {
    setUsername(name.target.value);
  };

  const handlePassword = (pass) => {
    setPassword(pass.target.value);
  };

  const instance = axios.create({
    baseURL: "http://176.58.105.174:3000",
  });

  const logIn = async () => {
    let obj = {};
    obj.username = username;
    obj.password = password;

    const data = instance
      .post(`${apiClient}/auth/signinadmin`, obj)
      .then(function (response) {
        return loginAdmin(response.data.accessToken);
      })
      .catch((e) => {
        console.log(e.message);
      });
  };

  return (
    <>
      <h1 className="login-title">Welcome to Bet Application</h1>
      <Card className="mt-login">
        <Form>
          <Input
            type="name"
            placeholder="name"
            onChange={(e) => handleUsername(e)}
          />
          <Input
            type="password"
            placeholder="password"
            onChange={(e) => handlePassword(e)}
          />
          <Button className="btn-login" onClick={logIn}>
            Sign In
          </Button>
        </Form>
        <Link to="/signup">Don't have an account?</Link>
      </Card>
    </>
  );
};

export default LoginAdmin;
