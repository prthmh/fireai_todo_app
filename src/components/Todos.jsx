import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { LuTrash } from "react-icons/lu";
import { MdModeEdit } from "react-icons/md";

import { useTodo } from "../context/TodoContext";
import TodoModal from "./TodoModal";

const Todos = ({ todos }) => {
  const [openEditTodoModal, setOpenEditTodoModal] = useState(false);
  const [editTodo, setEditTodo] = useState();
  const { getTodoByIdHandler, deleteTodoHandler } = useTodo();
  const navigate = useNavigate();

  const handleTodoClick = (todoId) => {
    getTodoByIdHandler(todoId);
    navigate(`/todo/${todoId}`);
  };

  if (todos.length <= 0) {
    return (
      <h1 className=" text-2xl font-bold text-orange-100">
        No todos. Add some todos by clicking on the{" "}
        <span className=" text-orange-500">Add Todo</span> button or search a
        todo which you have already added.
      </h1>
    );
  }
  console.log(todos);
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-9 sm:gap-14">
      {todos.map((t) => (
        <div
          key={t._id}
          onClick={() => handleTodoClick(t._id)}
          className=" bg-orange-100 text-neutral-800 p-4 sm:p-6 rounded-xl shadow-3xl flex flex-col gap-4 cursor-pointer"
        >
          <h2 className=" text-xl font-semibold sm:text-2xl sm:font-bold">
            {t.title}
          </h2>
          <div>
            {t.status ? (
              <span className=" bg-green-600 text-orange-100 p-[6px] rounded-lg text-sm w-fit">
                Completed
              </span>
            ) : (
              <span className=" bg-red-600 text-orange-100 p-[6px] rounded-lg text-sm w-fit">
                Not Completed
              </span>
            )}
          </div>
          <div className="flex gap-3">
            {t.flag && (
              <div className=" bg-neutral-700 text-orange-100 p-[6px] rounded-lg text-sm w-fit">
                {t.flag}
              </div>
            )}
            {t.priority && (
              <div className=" bg-orange-500 text-orange-50 p-[6px] rounded-lg text-sm w-fit">
                Priority
              </div>
            )}
          </div>
          <div className="flex justify-evenly items-center">
            <div
              className=" bg-red-600 text-white p-1 rounded-md cursor-pointer"
              onClick={(e) => {
                e.stopPropagation();
                deleteTodoHandler(t._id);
              }}
            >
              <LuTrash size={22} />
            </div>
            <div
              className=" bg-blue-600 text-white p-1 rounded-md cursor-pointer"
              onClick={(e) => {
                e.stopPropagation();
                setEditTodo(t);
                setOpenEditTodoModal(true);
              }}
            >
              <MdModeEdit size={22} />
            </div>
          </div>
        </div>
      ))}

      {openEditTodoModal && (
        <div
          className=" flex justify-center items-center fixed inset-0 z-10 bg-opacity-50 backdrop-blur-sm"
          onClick={() => setOpenEditTodoModal(false)}
        >
          <TodoModal
            editTodo={editTodo}
            setOpenEditTodoModal={setOpenEditTodoModal}
          />
        </div>
      )}
    </div>
  );
};

export default Todos;
