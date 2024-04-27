import axios from "axios";
import { useEffect, useReducer, useState } from "react";
import { useContext } from "react";

import reducer from "../reducers/authReducer.js";
import toast from "react-hot-toast";
import { signupService } from "../service/auhtServices.js";
import { AUTHACTIONTYPES } from "../constants.js";

const { createContext } = require("react");

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const tokenFromLocalStorage = JSON.parse(
    localStorage.getItem("loginData_fireai")
  )?.token;
  const userFromLocalStorage = JSON.parse(
    localStorage.getItem("loginData_fireai")
  )?.user;

  const initialAuthState = {
    token: tokenFromLocalStorage,
    user: userFromLocalStorage,
    isLoading: false,
    isLoggedIn: !!tokenFromLocalStorage,
  };

  const [state, dispatch] = useReducer(reducer, initialAuthState);

  const signupHandler = async ({ email, fullname, username, password }) => {
    dispatch({ type: AUTHACTIONTYPES.LOADING });
    try {
      const { user, encodedToken } = await signupService({
        email,
        fullname,
        username,
        password,
      });

      dispatch({
        type: AUTHACTIONTYPES.SIGNUP,
        payload: { user, encodedToken },
      });

      toast.success("Signup Successfull!");
    } catch (err) {
      console.log(err);
      toast.error(err.message);
      dispatch({ type: AUTHACTIONTYPES.NOT_LOADING });
    } finally {
      dispatch({ type: AUTHACTIONTYPES.NOT_LOADING });
    }
  };

  const loginHandler = async ({ username, password }) => {
    dispatch({ type: AUTHACTIONTYPES.LOADING });
    try {
      const { user, encodedToken } = await signupService({
        username,
        password,
      });

      dispatch({
        type: AUTHACTIONTYPES.LOGIN,
        payload: { user, encodedToken },
      });

      toast.success("Login Successfull!");
    } catch (err) {
      console.log(err);
      toast.error(err.message);
      dispatch({ type: AUTHACTIONTYPES.NOT_LOADING });
    } finally {
      dispatch({ type: AUTHACTIONTYPES.NOT_LOADING });
    }
  };

  const logoutHandler = () => {
    dispatch({ type: AUTHACTIONTYPES.LOGOUT });
    toast.success("Logged out Successfully");
  };

  return (
    <AuthContext.Provider
      value={{ state, dispatch, signupHandler, loginHandler, logoutHandler }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
