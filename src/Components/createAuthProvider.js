import { useState, useEffect } from "react";
import axios from "axios";
import createTokenProvider from "./tokenUtils";

const createAuthProvider = () => {
  const instance = axios.create({
    baseURL: "http://176.58.105.174:3000",
  });
  const tokenProvider = createTokenProvider();

  const login = (newTokens) => {
    tokenProvider.setToken(newTokens);
  };

  const loginAdmin = (newTokens) => {
    tokenProvider.setToken(newTokens, true);
  };

  const logout = () => {
    tokenProvider.setToken(null);
  };

  const authFetch = async (input, init) => {
    const token = await tokenProvider.getToken();

    const usersList = await instance
      .get(`/auth/users`)
      .then(function (response) {
        return response.data;
      })
      .catch((e) => {
        console.log(e.message);
      });
    init = init || {};

    init.headers = {
      ...init.headers,
      Authorization: `Bearer ${token}`,
    };

    return fetch(input, init);
  };

  const useAuth = () => {
    const loggedIn = tokenProvider.isLoggedIn();
    const [isLogged, setIsLogged] = useState(loggedIn);

    useEffect(() => {
      function listener(newIsLogged) {
        setIsLogged(newIsLogged);
      }

      tokenProvider.subscribe(listener);

      return () => {
        tokenProvider.unsubscribe(listener);
      };
    }, []);

    return [isLogged];
  };

  const useAuthAdmin = () => {
    const loggedIn = tokenProvider.isLoggedInAdmin();
    const [isLoggedAdmin, setIsLoggedAdmin] = useState(loggedIn);

    useEffect(() => {
      function listener(newIsLoggedAdmin) {
        setIsLoggedAdmin(newIsLoggedAdmin);
      }

      tokenProvider.subscribeAdmin(listener);

      return () => {
        tokenProvider.unsubscribeAdmin(listener);
      };
    }, []);

    return [isLoggedAdmin];
  };

  return {
    useAuth,
    useAuthAdmin,
    authFetch,
    login,
    logout,
    loginAdmin,
  };
};

export const {
  useAuth,
  useAuthAdmin,
  authFetch,
  login,
  loginAdmin,
  logout,
} = createAuthProvider();
