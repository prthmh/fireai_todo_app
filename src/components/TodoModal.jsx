import { useState } from "react";
import { RxCrossCircled } from "react-icons/rx";
import { useAuth } from "../context/AuthContext";
import { useTodo } from "../context/TodoContext";

const intialformData = {
  title: "",
  description: "",
  status: false,
  priority: false,
  flag: "",
};

const TodoModal = ({ editTodo, setOpenTodoModal, setOpenEditTodoModal }) => {
  const { user } = useAuth();
  const { addTodoHandler, editTodoHandler } = useTodo();
  const [formData, setFormData] = useState(editTodo ?? intialformData);
  const toStopPropagation = (e) => {
    e.stopPropagation();
  };

  const handleFormChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value,
    }));
  };

  const handleSubmit = () => {
    if (!editTodo) {
      const newTodo = {
        title: formData.title,
        description: formData.description,
        status: formData.status,
        priority: formData.priority,
        flag: formData.flag,
        username: user.username,
      };
      addTodoHandler(newTodo);
    } else {
      editTodoHandler(formData);
    }
    setOpenTodoModal && setOpenTodoModal(false);
    setOpenEditTodoModal && setOpenEditTodoModal(false);
  };
  
  return (
    <div
      onClick={toStopPropagation}
      className=" p-4 bg-neutral-900 text-orange-100 flex flex-col rounded-xl w-[350px] border-2 border-zinc-400"
    >
      <div className="flex justify-between items-center">
        <h2 className=" text-2xl font-semibold">
          {editTodo ? "Edit" : "Add"} Todo
        </h2>
        <div
          className="flex justify-center items-center bg-orange-100 text-neutral-900 rounded-full cursor-pointer"
          onClick={() => {
            setOpenTodoModal && setOpenTodoModal(false);
            setOpenEditTodoModal && setOpenEditTodoModal(false);
          }}
        >
          <RxCrossCircled size={25} />
        </div>
      </div>
      <form className="flex flex-col gap-4">
        <label htmlFor="title" className=" font-semibold text-lg">
          Title
        </label>
        <input
          id="title"
          type="text"
          placeholder="Enter title"
          required
          className="custom-input"
          value={formData.title}
          onChange={handleFormChange}
        />
        <label htmlFor="description" className=" font-semibold text-lg">
          Description
        </label>
        <input
          id="description"
          type="text"
          placeholder="Enter description"
          required
          className="custom-input"
          value={formData.description}
          onChange={handleFormChange}
        />
        <label htmlFor="status" className=" font-semibold text-lg">
          Status
        </label>
        <div className="flex gap-3">
          <input
            id="statusCompleted"
            name="status"
            type="radio"
            required
            checked={formData.status}
            onChange={() =>
              setFormData((prevState) => ({ ...prevState, status: true }))
            }
          />
          <span className="text-sm">Completed</span>
          <input
            id="statusNotCompleted"
            name="status"
            type="radio"
            required
            checked={!formData.status}
            onChange={() =>
              setFormData((prevState) => ({ ...prevState, status: false }))
            }
          />
          <span className="text-sm">Not Completed</span>
        </div>
        <label htmlFor="priority" className=" font-semibold text-lg">
          Priority
        </label>
        <div className="flex gap-3">
          <input
            id="priority"
            name="priority"
            type="radio"
            required
            checked={formData.priority}
            onChange={() =>
              setFormData((prevState) => ({ ...prevState, priority: true }))
            }
          />
          <span className="text-sm">Yes</span>
          <input
            id="notpriority"
            name="priority"
            type="radio"
            required
            checked={!formData.priority}
            onChange={() =>
              setFormData((prevState) => ({ ...prevState, priority: false }))
            }
          />
          <span className="text-sm">No</span>
        </div>

        <label htmlFor="flag">Flag(Add only one flag)</label>
        <input
          id="flag"
          type="text"
          placeholder="Enter Flag"
          required
          className="custom-input"
          value={formData.flag}
          onChange={handleFormChange}
        />
      </form>

      <button
        onClick={handleSubmit}
        className=" py-3 rounded-xl text-neutral-950 bg-orange-50 font-semibold hover:opacity-65 w-full mt-7"
      >
        {editTodo ? "Save" : "Add"}
      </button>
    </div>
  );
};

export default TodoModal;
