import axios from "axios";
import { createContext, useEffect, useReducer, useState } from "react";
import { useContext } from "react";

import reducer from "../reducers/authReducer.js";
import toast from "react-hot-toast";
import { loginService, signupService } from "../service/auhtServices.js";
import { AUTHACTIONTYPES } from "../constants.js";

export const AuthContext = createContext();

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
    console.log({ email, fullname, username, password });
    dispatch({ type: AUTHACTIONTYPES.LOADING });
    try {
      const {
        data: { user, encodedToken },
      } = await signupService({
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
      const {
        data: { user, encodedToken },
      } = await loginService({
        username,
        password,
      });
      console.log("login handler", user, encodedToken);
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

  const { token, user, isLoading, isLoggedIn } = state;
  return (
    <AuthContext.Provider
      value={{
        token,
        user,
        isLoading,
        isLoggedIn,
        dispatch,
        signupHandler,
        loginHandler,
        logoutHandler,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
