import { IoMdArrowRoundBack } from "react-icons/io";

import { useTodo } from "../../context/TodoContext";
import { useNavigate } from "react-router-dom";

const TodoPage = () => {
  //   const params = useParams();
  const { todoOnPage } = useTodo();
  const navigate = useNavigate();
  console.log(todoOnPage);
  return (
    <div className="flex justify-center items-center h-screen flex-col mx-28 gap-5">
      <div className=" bg-orange-100 p-5 text-neutral-800 w-[300px] rounded-2xl flex flex-col gap-4">
        <div
          className="flex justify-center items-center text-neutral-900 self-start cursor-pointer"
          onClick={() => navigate(-1)}
        >
          <IoMdArrowRoundBack size={25} />
        </div>
        <h1 className=" text-2xl font-bold">{todoOnPage.title}</h1>
        <p>
          <span className=" font-bold">Description: </span>
          {todoOnPage.description}
        </p>
        <p>
          <span className=" font-bold">Status: </span>
          {todoOnPage.status ? "Compeleted" : "Not Compeleted"}
        </p>
        <p>
          <span className=" font-bold">Priority: </span>
          {todoOnPage.priority ? "Yes" : "No"}
        </p>
        <p>
          <span className=" font-bold">Flag: </span>
          {todoOnPage.flag}
        </p>
      </div>
    </div>
  );
};

export default TodoPage;
