import { useTodo } from "../../context/TodoContext";
import Todos from "../../components/Todos";
import Loader from "../../components/Loader";
import { useState } from "react";
import TodoModal from "../../components/TodoModal";
import { FaMagnifyingGlass } from "react-icons/fa6";

const Home = () => {
  const { todos, isLoading } = useTodo();
  const [openTodoModal, setOpenTodoModal] = useState(false);
  const [search, setSearch] = useState("");

  const filteredTodos = todos.filter((t) =>
    t.title.toLowerCase().includes(search)
  );

  return (
    <div className=" flex items-center justify-center flex-col gap-7 mt-9 sm:my-12 mx-8">
      <div className="flex justify-evenly items-center w-full">
        <div className="flex items-center gap-2">
          <div className=" text-orange-100">
            <FaMagnifyingGlass size={25} />
          </div>
          <input
            type="text"
            placeholder="Search todo by title"
            value={search}
            onChange={(e) => setSearch(e.target.value.toLowerCase().trim())}
            className=" bg-neutral-950 text-sm rounded-lg outline-none block w-full p-4 shadow-2xl text-orange-100"
          />
        </div>
        <button
          onClick={() => setOpenTodoModal(true)}
          className=" bg-orange-50 text-neutral-700 py-2 px-4 text-lg font-semibold rounded-xl"
        >
          Add Todo
        </button>
      </div>
      {isLoading ? <Loader /> : <Todos todos={filteredTodos} />}

      {openTodoModal && (
        <div
          className=" flex justify-center items-center fixed inset-0 z-10 bg-opacity-50 backdrop-blur-sm"
          onClick={() => setOpenTodoModal(false)}
        >
          <TodoModal setOpenTodoModal={setOpenTodoModal} />
        </div>
      )}
    </div>
  );
};

export default Home;
