import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Home from "../pages/Home/Home";
import Landing from "../pages/Landing/Landing";
import Login from "../pages/Login/Login";
import Signup from "../pages/Signup/Signup";
import { ProtectedRoute } from "./ProtectedRoute";
import TodoPage from "../pages/TodoPage.jsx/TodoPage";

const Routes = () => {
  const { token } = useAuth();

  const publicRoutes = [
    {
      path: "/landing",
      element: <Landing />,
    },
  ];

  const privateRoutes = [
    {
      path: "/",
      element: <ProtectedRoute />,
      children: [
        {
          path: "/home",
          element: <Home />,
        },
        {
          path: "/todo/:todoId",
          element: <TodoPage />,
        },
      ],
    },
  ];

  const routesForNonAuthenticated = [
    { path: "/login", element: <Login /> },
    { path: "/signup", element: <Signup /> },
  ];

  const router = createBrowserRouter([
    ...publicRoutes,
    ...privateRoutes,
    ...routesForNonAuthenticated,
    // ...(!token ? routesForNonAuthenticated : []),
  ]);

  return <RouterProvider router={router} />;
};

export default Routes;
