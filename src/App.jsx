import { Toaster } from "react-hot-toast";
import "./App.css";
import { AuthProvider } from "./context/AuthContext";
import Routes from "./routes";
import { TodoProvider } from "./context/TodoContext";

function App() {
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
