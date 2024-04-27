import axios from "axios";

const API_URL = `${import.meta.env.VITE_API_URL}/todo`;

async function getTodosService(username) {
  const res = await axios.get(`${API_URL}/${username}`);
  return res.data;
}

async function getTodoByIdService(todoId) {
  const res = await axios.get(`${API_URL}/single-todo/${todoId}`);
  return res.data;
}

async function addTodoService({ todoData, token }) {
  const headers = {
    authorization: token,
    "Content-Type": "application/json",
  };

  const res = await axios.post(`${API_URL}`, { todoData }, { headers });
  return res.data;
}

async function editTodoService({ todoData, token, todoId }) {
  const headers = {
    authorization: token,
    "Content-Type": "application/json",
  };

  const res = await axios.post(
    `${API_URL}/edit/${todoId}`,
    { todoData },
    { headers }
  );
  return res.data;
}

async function deleteTodoService({ token, todoId }) {
  const headers = {
    authorization: token,
  };

  const res = await axios.delete(`${API_URL}/${todoId}`, { headers });
  return res.data;
}

export { getTodosService, getTodoByIdService, addTodoService, editTodoService, deleteTodoService };
