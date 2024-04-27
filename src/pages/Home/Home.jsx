import { useTodo } from "../../context/TodoContext";
import Todos from "../../components/Todos";
import Loader from "../../components/Loader";

const Home = () => {
  const { todos, isLoading } = useTodo();

  return (
    <div className=" flex items-center justify-center mx-7 my-10">
      {isLoading ? <Loader /> : <Todos todos={todos} />}
    </div>
  );
};

export default Home;
