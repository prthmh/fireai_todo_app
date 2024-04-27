import axios from "axios";

const API_URL = `${import.meta.env.VITE_API_URL}/todo`;

async function getTodosService(username) {
  const res = await axios.get(`${API_URL}/${username}`);
  return res.data;
}

async function getTodoByIdService(todoId) {
  const res = await axios.get(`${API_URL}//single-todo/${todoId}`);
  return res.data;
}

export { getTodosService, getTodoByIdService };
