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
        className="flex justify-center items-center text-orange-100"
        onClick={() => navigate(-1)}
      >
        <IoMdArrowRoundBack size={20} />
      </div>
      <div className=" bg-orange-50 p-5 text-neutral-800 w-[300px] rounded-2xl">
        <h1 className=" text-2xl font-bold">{todoOnPage.title}</h1>
        
      </div>
    </div>
  );
};

export default TodoPage;
