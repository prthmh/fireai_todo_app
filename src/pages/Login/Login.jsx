import { Link, useNavigate } from "react-router-dom";
import { MdArrowForwardIos } from "react-icons/md";
import { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import Loader from "../../components/Loader";

const intialLoginData = {
  username: "",
  password: "",
};

const Login = () => {
  const [formData, setFormData] = useState(intialLoginData);
  const { token, isLoading, loginHandler } = useAuth();
  const navigate = useNavigate();

  const handleFormChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value,
    }));
  };

  const onFormSubmit = (e) => {
    // e.preventDefaut();
    console.log("form", formData);
    loginHandler(formData);
    navigate("/");
  };

  useEffect(() => {
    if (token) {
      navigate("/home");
    }
  }, [token]);

  return (
    <div className=" flex justify-center flex-col items-center h-screen text-orange-50">
      {isLoading && <Loader />}
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
            onChange={handleFormChange}
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
            onChange={handleFormChange}
          />
        </form>
        <button
          className=" py-3 rounded-xl text-neutral-950 bg-orange-50 font-semibold hover:opacity-65 w-full mt-7"
          onClick={onFormSubmit}
        >
          Login
        </button>
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
