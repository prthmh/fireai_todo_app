import { Toaster } from "react-hot-toast";
import "./App.css";
import { AuthProvider } from "./context/AuthContext";
import Routes from "./routes";

function App() {
  return (
    <>
      <Toaster />
      <AuthProvider>
        <Routes/>
      </AuthProvider>
    </>
  );
}

export default App;
