import toast, { Toaster } from "react-hot-toast";
import "./App.css";
import { AuthProvider } from "./context/AuthContext";
import Routes from "./routes";
import { TodoProvider } from "./context/TodoContext";
import { useEffect } from "react";

function App() {
  useEffect(() => {
    toast(
      "Please be patient while the application loads. The backend is deployed on a free-tier of render.com, so the initial load time might be longer. Subsequent interactions should be faster.",
      { duration: 6000 }
    );
  }, []);
  return (
    <>
      <Toaster />
      <AuthProvider>
        <TodoProvider>
          <Routes />
        </TodoProvider>
      </AuthProvider>
    </>
  );
}

export default App;
