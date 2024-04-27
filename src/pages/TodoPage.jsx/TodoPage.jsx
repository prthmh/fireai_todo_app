import { IoMdArrowRoundBack } from "react-icons/io";

import { useTodo } from "../../context/TodoContext";
import { useNavigate } from "react-router-dom";

const TodoPage = () => {
  //   const params = useParams();
  const { todoOnPage } = useTodo();
  const navigate = useNavigate();
  console.log(todoOnPage);
  return (
    <div className="flex justify-center items-center h-screen flex-col mx-28">
      <div
        className="flex justify-center items-center"
        onClick={() => navigate(-1)}
      >
        <IoMdArrowRoundBack size={20} />
      </div>
      <div className=" bg-orange-50 p-4 text-neutral-900">
        <h1>{todoOnPage.title}</h1>
      </div>
    </div>
  );
};

export default TodoPage;
