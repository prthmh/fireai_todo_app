import axios from "axios";

const API_URL = `${import.meta.env.VITE_API_URL}/auth`;

async function loginService({ username, password }) {
  console.log("loginservice", { username, password });
  const res = axios.post(`${API_URL}/login`, { username, password });
  console.log("logn service", res);
  return res;
}

async function signupService({ email, fullname, username, password }) {
  return axios.post(`${API_URL}/signup`, {
    email,
    fullname,
    username,
    password,
  });
}

export { signupService, loginService };
