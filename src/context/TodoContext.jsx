import { createContext, useContext, useEffect, useReducer } from "react";
import toast from "react-hot-toast";

import reducer from "../reducers/todoReducer";
import { useAuth } from "./AuthContext";
import { getTodoByIdService, getTodosService } from "../service/todoServices";
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

  useEffect(() => {
    if (token) {
      getTodosHandler();
    }
  }, [token]);
  const { todos, isLoading, todoOnPage } = state;
  return (
    <TodoContext.Provider
      value={{
        getTodosHandler,
        todos,
        isLoading,
        todoOnPage,
        getTodoByIdHandler,
      }}
    >
      {children}
    </TodoContext.Provider>
  );
};

export const useTodo = () => useContext(TodoContext);
