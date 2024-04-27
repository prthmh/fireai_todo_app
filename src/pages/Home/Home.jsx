import { useTodo } from "../../context/TodoContext";
import Todos from "../../components/Todos";
import Loader from "../../components/Loader";
import { useState } from "react";
import TodoModal from "../../components/TodoModal";

const Home = () => {
  const { todos, isLoading } = useTodo();
  const [openTodoModal, setOpenTodoModal] = useState(false);

  return (
    <div className=" flex items-center justify-center flex-col gap-7 mt-9 sm:my-12 mx-8">
      <div>
        <button
          onClick={() => setOpenTodoModal(true)}
          className=" bg-orange-50 text-neutral-700 py-2 px-4 text-lg font-semibold rounded-xl mt-5"
        >
          Add Todo
        </button>
      </div>
      {isLoading ? <Loader /> : <Todos todos={todos} />}

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
