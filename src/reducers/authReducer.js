import { AUTHACTIONTYPES } from "../constants";

function authReducer(state, action) {
  const { type, payload } = action;

  switch (type) {
    case AUTHACTIONTYPES.SIGNUP: {
      const { user, encodedToken } = payload;
      localStorage.setItem(
        "loginData_fireai",
        JSON.stringify({
          token: encodedToken,
          user,
        })
      );

      return {
        ...state,
        token: encodedToken,
        user,
        isLoading: false,
        isLoggedIn: true,
      };
    }

    case AUTHACTIONTYPES.LOGIN: {
      const { user, encodedToken } = payload;
      localStorage.setItem(
        "loginData_fireai",
        JSON.stringify({
          token: encodedToken,
          user,
        })
      );

      return {
        ...state,
        token: encodedToken,
        user,
        isLoading: false,
        isLoggedIn: true,
      };
    }

    case AUTHACTIONTYPES.LOGOUT: {
      localStorage.removeItem("loginData_fireai");
      return { token: null, user: null, isLoggedIn: false, isLoading: false };
    }

    case AUTHACTIONTYPES.LOADING: {
      return {
        ...state,
        isLoading: true,
      };
    }

    case AUTHACTIONTYPES.NOT_LOADING: {
      return {
        ...state,
        isLoading: false,
      };
    }
    default:
      return state;
  }
}

export default authReducer;
