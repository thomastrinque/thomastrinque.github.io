import React, { useState, useEffect } from "react";
import { Button, Icon } from "semantic-ui-react";
import { Card, Form, Input } from "./AuthForm.style";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { logout } from "./createAuthProvider";
// import { Link } from "react-router-dom";
//fezOIJ490"çJI
const instance = axios.create({
  baseURL: "http://176.58.105.174:3000",
});

const ListUsers = () => {
  const [usersList, setUsersList] = useState([]);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    async function getUsers() {
      const usersList = await instance
        .get(`/auth/users`)
        .then(function (response) {
          return response.data;
        })
        .catch((e) => {
          console.log(e.message);
        });
      setUsersList(usersList);
    }
    getUsers();
  }, []);

  const deleteUser = async (username) => {
    await instance
      .delete(`/auth/user?username=${username}`)
      .then(function (response) {
        if (response.data === true) {
          const leftUsers = usersList.filter((e) => e !== username);
          setUsersList(leftUsers);
        }
        toast.success("Utilisateur supprimé !");
        return response.data;
      })
      .catch((e) => {
        if (e.response && e.response.data && e.response.data.message) {
          toast.error(e.response.data.message);
        } else {
          toast.error("L'utilisateur n'a pas été supprimé !")
        }
      });
  };

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

    await instance
      .post(`/auth/signup`, obj)
      .then(async function (response) {
        const usersList = await instance
          .get(`/auth/users`)
          .then(function (response) {
            return response.data;
          })
          .catch((e) => {
            console.log(e.message);
          });
        setUsersList(usersList);
        toast.success("Utilisateur ajouté !");
      })
      .catch((e) => {
        if (e.response && e.response.data && e.response.data.message) {
          if (typeof e.response.data.message === 'string') toast.error(e.response.data.message);
          else {
            e.response.data.message.map(e => {
              toast.error(e)
            })
          }//fez
        } else {
          toast.error("L'utilisateur n'a pas été ajouté !")
        }
      });
  };

  return (
    <>
      <ToastContainer />
      <h1 className="login-title">Welcome to Admin Interface</h1>
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
      <ul className="ul-mt">
        {usersList.length > 0 ? (
          usersList.map((user, key) => {
            return (
              <>
                <li key={key} className="list-users">
                  {user}
                  <Button
                    animated
                    className="red red-logout"
                    onClick={() => deleteUser(user)}
                  >
                    <Button.Content visible>Supprimer</Button.Content>
                    <Button.Content hidden>
                      <Icon name="arrow right" />
                    </Button.Content>
                  </Button>
                </li>
              </>
            );
          })
        ) : (
            <li>Aucun utilisateurs</li>
          )}
      </ul>
      {/* <Button>
        <Link to={"/bet"} />
        Go to Bets
      </Button> */}
      {/* <Button animated className="red red-logout" onClick={logout}>
        <Button.Content visible>Log out</Button.Content>
        <Button.Content hidden>
          <Icon name="arrow right" />
        </Button.Content>
      </Button> */}
    </>
  );
};

export default ListUsers;
