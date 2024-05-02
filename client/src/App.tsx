import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { Layout, RequireAuth } from "./components/layout/Layout";
import HomePage from "./pages/homePage/HomePage";
import ListPage from "./pages/listPage/ListPage";
import SinglePage from "./pages/singlePage/SinglePage";
import ProfilePage from "./pages/profile/ProfilePage";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import ProfileUpdatePage from "./pages/profileUpdate/ProfileUpdatePage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <div>Error loading page...</div>,
    children: [
      {
        path: "/",
        index: true,
        element: <HomePage />,
      },
      {
        path: "/list",
        element: <ListPage />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/register",
        element: <Register />,
      },
      {
        path: "/:id",
        element: <SinglePage />,
      },
    ],
  },
  {
    path: "/",
    element: <RequireAuth />,
    children: [
      {
        path: "/profile",
        element: <ProfilePage />,
      },
      {
        path: "/profile/update",
        element: <ProfileUpdatePage />,
      },
    ],
  },
]);

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;
