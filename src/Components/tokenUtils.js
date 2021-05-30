import axios from 'axios';
import { authFetch } from "../Components/createAuthProvider"

const createTokenProvider = () => {
  const instance = axios.create({
    baseURL: "http://176.58.105.174:3000",
  });

  let stored = localStorage.getItem("BET_TOKEN_AUTH52456") || "";
  let storedAdmin = localStorage.getItem("BET_TOKEN_AUTH52459874566") || "";

  let _token = stored ? JSON.parse(stored) || null : null;
  let _token_admin = storedAdmin ? JSON.parse(storedAdmin) || null : null;

  const getToken = async () => {
    if (!_token) {
      return null;
    }
    return _token;
  };

  const isLoggedIn = () => {
    return !!_token || !!_token_admin; // Transforme la valeur en booléan
  };

  const isLoggedInAdmin = () => {
    return !!_token_admin; // Transforme la valeur en booléan
  };


  let observers = [];
  let observersAdmin = [];

  const subscribe = (observer) => {
    observers.push(observer);
  };

  const unsubscribe = (observer) => {
    observers = observers.filter((_observer) => _observer !== observer);
  };

  const subscribeAdmin = (observer) => {
    observersAdmin.push(observer);
  };

  const unsubscribeAdmin = (observer) => {
    observersAdmin = observersAdmin.filter((_observer) => _observer !== observer);
  };

  const notify = () => {
    const isLogged = isLoggedIn();
    const isLoggedAdmin = isLoggedInAdmin();
    if (isLoggedAdmin) {
      observers.forEach((observer) => observer(isLoggedAdmin));
      observersAdmin.forEach((observer) => observer(isLoggedAdmin));
    } else {
      observers.forEach((observer) => observer(isLogged));
      observersAdmin.forEach((observer) => observer(isLoggedAdmin));
    }

  };

  const setToken = (token, admin) => {
    if (token) {
      if (admin) {
        localStorage.setItem("BET_TOKEN_AUTH52459874566", JSON.stringify(token));
        _token_admin = token;

      } else {
        localStorage.setItem("BET_TOKEN_AUTH52456", JSON.stringify(token));
        _token = token;
      }
    } else {
      localStorage.removeItem("BET_TOKEN_AUTH52459874566");
      localStorage.removeItem("BET_TOKEN_AUTH52456");

    }
    notify();
  };

  return {
    getToken,
    isLoggedIn,
    isLoggedInAdmin,
    setToken,
    subscribe,
    subscribeAdmin,
    unsubscribeAdmin,
    unsubscribe,
  };
};

export default createTokenProvider;
