import { createContext, useContext, useEffect, useReducer } from "react";
import toast from "react-hot-toast";

import reducer from "../reducers/todoReducer";
import { useAuth } from "./AuthContext";
import {
  addTodoService,
  deleteTodoService,
  editTodoService,
  getTodoByIdService,
  getTodosService,
} from "../service/todoServices";
import { TODOACTIONTYPES } from "../constants";

export const TodoContext = createContext();

const initalTodoState = {
  todos: [],
  isLoading: false,
  todoOnPage: {},
};

export const TodoProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initalTodoState);
  const { token, user } = useAuth();

  const getTodosHandler = async () => {
    dispatch({ type: TODOACTIONTYPES.LOADING });
    try {
      const data = await getTodosService(user.username);
      dispatch({ type: TODOACTIONTYPES.GET_TODOS, payload: data.todos });
    } catch (err) {
      console.log(err);
      toast.error(err.message);
      dispatch({ type: TODOACTIONTYPES.NOT_LOADING });
    } finally {
      dispatch({ type: TODOACTIONTYPES.NOT_LOADING });
    }
  };

  const getTodoByIdHandler = async (todoId) => {
    try {
      const data = await getTodoByIdService(todoId);
      dispatch({ type: TODOACTIONTYPES.GET_TODOONPAGE, payload: data.todo });
    } catch (err) {
      console.log(err);
      toast.error(err.message);
      dispatch({ type: TODOACTIONTYPES.NOT_LOADING });
    }
  };

  const addTodoHandler = async ({
    title,
    description,
    status,
    priority,
    flag,
    username,
  }) => {
    const todoData = {
      title,
      description,
      status,
      priority,
      flag,
      username,
    };
    dispatch({ type: TODOACTIONTYPES.LOADING });
    try {
      const data = await addTodoService({ todoData, token });

      dispatch({ type: TODOACTIONTYPES.ADD_TODO, payload: data.todos });

      toast.success("Todo Added Successfully!");
    } catch (err) {
      console.log(err);
      toast.error(err.message);
      dispatch({ type: TODOACTIONTYPES.NOT_LOADING });
    } finally {
      dispatch({ type: TODOACTIONTYPES.NOT_LOADING });
    }
  };

  const editTodoHandler = async (editTodo) => {
    const todoData = {
      title: editTodo.title,
      description: editTodo.description,
      status: editTodo.status,
      priority: editTodo.priority,
      flag: editTodo.flag,
      username: editTodo.username,
    };

    dispatch({ type: TODOACTIONTYPES.LOADING });
    try {
      const data = await editTodoService({
        todoData,
        token,
        todoId: editTodo._id,
      });

      dispatch({ type: TODOACTIONTYPES.ADD_TODO, payload: data.todos });

      toast.success("Todo Added Successfully!");
    } catch (err) {
      console.log(err);
      toast.error(err.message);
      dispatch({ type: TODOACTIONTYPES.NOT_LOADING });
    } finally {
      dispatch({ type: TODOACTIONTYPES.NOT_LOADING });
    }
  };

  const deleteTodoHandler = async (todoId) => {
    dispatch({ type: TODOACTIONTYPES.LOADING });
    try {
      const data = await deleteTodoService({ token, todoId });

      dispatch({ type: TODOACTIONTYPES.DELETE_TODO, payload: data.todos });
      toast.success("Todo Deleted Successfully!");
    } catch (err) {
      console.log(err);
      toast.error(err.message);
      dispatch({ type: TODOACTIONTYPES.NOT_LOADING });
    } finally {
      dispatch({ type: TODOACTIONTYPES.NOT_LOADING });
    }
  };

  const { todos, isLoading, todoOnPage } = state;

  useEffect(() => {
    if (token) {
      getTodosHandler();
    }
  }, [token]);
  return (
    <TodoContext.Provider
      value={{
        getTodosHandler,
        todos,
        isLoading,
        todoOnPage,
        getTodoByIdHandler,
        addTodoHandler,
        editTodoHandler,
        deleteTodoHandler,
      }}
    >
      {children}
    </TodoContext.Provider>
  );
};

export const useTodo = () => useContext(TodoContext);
