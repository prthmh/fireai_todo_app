import axios from "axios";

const API_URL = `${import.meta.env.API_URL}/auth`;

async function loginService(username, password) {
  return axios.post(`${API_URL}/login`, { username, password });
}

async function signupService(email, fullname, username, password) {
  return axios.post(`${API_URL}/signup`, {
    email,
    fullname,
    username,
    password,
  });
}

export { signupService, loginService };
