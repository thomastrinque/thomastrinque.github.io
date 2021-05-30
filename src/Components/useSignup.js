import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth, authFetch, login, logout } from "./createAuthProvider";
import { Card, Form, Input, Button } from "./AuthForm.style";
import axios from "axios";

const instance = axios.create({
  baseURL: "http://176.58.105.174:3000",
});


const useSignup = (usersList) => {

  const [newUsersList, setNewUsersList] = useState([]);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleUsername = (name) => {
    setUsername(name.target.value);
  };

  const handlePassword = (pass) => {
    setPassword(pass.target.value);
  };

  const HandleSignup = async () => {
    let obj = {};
    obj.username = username;
    obj.password = password;

    const data = await instance
      .post(`/auth/signup`, obj)
      .then(async function (response) {
        const usersList = await instance
          .get(`/auth/users`)
          .then(function (response) {
            return response.data
          })
          .catch((e) => {
            console.log(e.message);
          });
        setNewUsersList(usersList);
      })
      .catch((e) => {
        console.log(e.message);
      });
  };

  console.log("userListuserListuserList", newUsersList)

  return (
    <Card>
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
        <Button className="btn-login" onClick={() => HandleSignup()}>
          Sign Up
          </Button>
      </Form>
    </Card>
  );
}

export default useSignup;
