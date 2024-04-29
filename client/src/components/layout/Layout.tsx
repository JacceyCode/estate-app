import { Outlet } from "react-router-dom";
import Navbar from "../navbar/Navbar";
import "./layout.scss";

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

export default Layout;
