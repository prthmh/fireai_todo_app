import { Link } from "react-router-dom";
import { MdArrowForwardIos } from "react-icons/md";

const Login = () => {
  return (
    <div className=" flex justify-center items-center h-screen text-orange-50">
      <div className=" bg-neutral-950 shadow-3xl rounded-xl border border-neutral-600 p-6 w-72 sm:w-[330px]">
        <h2 className=" text-3xl font-bold mb-3">Login</h2>
        <form className="flex flex-col gap-4">
          <label htmlFor="username" className=" font-medium">
            Username
          </label>
          <input
            id="username"
            type="text"
            placeholder="Enter Username"
            required
            className="custom-input"
          />
          <label htmlFor="password" className=" font-medium">
            Password
          </label>
          <input
            id="password"
            type="password"
            placeholder="Enter Password"
            required
            className="custom-input"
          />
          <button
            type="submit"
            className=" py-3 rounded-xl text-neutral-950 bg-orange-50 font-semibold hover:opacity-65"
          >
            Login
          </button>
        </form>
        <Link
          to="/signup"
          className=" underline flex items-center justify-center gap-2 mt-4"
        >
          Don't have an account? Signup{" "}
          <span className=" flex items-center justify-center">
            <MdArrowForwardIos size={15} />
          </span>
        </Link>
      </div>
    </div>
  );
};

export default Login;
