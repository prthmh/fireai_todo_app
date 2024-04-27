import { useState } from "react";
import { useTodo } from "../context/TodoContext";
import { useNavigate } from "react-router-dom";

const Todos = ({ todos }) => {
  const { getTodoByIdHandler } = useTodo();
  const navigate = useNavigate();

  const handleTodoClick = (todoId) => {
    getTodoByIdHandler(todoId);
    navigate(`/todo/${todoId}`);
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-14">
      {todos.map((t) => (
        <div
          key={t._id}
          onClick={() => handleTodoClick(t._id)}
          className=" bg-orange-100 text-neutral-900 p-6 rounded-xl shadow-3xl flex flex-col gap-4"
        >
          <h2 className=" text-2xl font-bold">{t.title}</h2>
          <div className="flex gap-3">
            <div className=" bg-neutral-800 text-orange-100 p-[6px] rounded-lg text-sm w-fit">
              {t.flag}
            </div>
            {t.priority && (
              <div className=" bg-orange-500 text-orange-50 p-[6px] rounded-lg text-sm w-fit">
                Priority
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Todos;
