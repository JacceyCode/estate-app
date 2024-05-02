import { Navigate, Outlet } from "react-router-dom";
import Navbar from "../navbar/Navbar";
import "./layout.scss";
import { useAuthContext } from "../../context/AuthContext";

const Layout = () => {
  return (
    <main className="layout">
      <div className="navbar">
        <Navbar />
      </div>
      <div className="content">
        <Outlet />
      </div>
    </main>
  );
};

const RequireAuth = () => {
  const { currentUser } = useAuthContext();

  return !currentUser ? (
    <Navigate to="/login" />
  ) : (
    <main className="layout">
      <div className="navbar">
        <Navbar />
      </div>
      <div className="content">
        <Outlet />
      </div>
    </main>
  );
};

export { Layout, RequireAuth };
