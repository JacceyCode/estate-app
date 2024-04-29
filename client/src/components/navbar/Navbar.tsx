import { useState } from "react";
import { Link } from "react-router-dom";
import "./navbar.scss";
import { userData } from "../../data/dummydata";

const Navbar = () => {
  const [open, setOpen] = useState(false);

  const user = true;

  return (
    <nav>
      <section className="left">
        <Link to="/" className="logo">
          <img src="/logo.png" alt="logo" />
          <span>SeronEstate</span>
        </Link>

        <Link to="/">Home</Link>
        <Link to="/">About</Link>
        <Link to="/">Contact</Link>
        <Link to="/">Agents</Link>
      </section>

      <section className="right">
        {user ? (
          <section className="user">
            <img src={userData.img} alt={userData.name} />
            <span>{userData.name}</span>
            <Link to="/profile">
              <div className="notification">3</div>
              <span>Profile</span>
            </Link>
          </section>
        ) : (
          <>
            <Link to="/">Sign in</Link>
            <Link to="/" className="register">
              Sign up
            </Link>
          </>
        )}

        <div className="menuIcon">
          <img
            src="/menu.png"
            alt="menu bar"
            onClick={() => setOpen((prev) => !prev)}
          />
        </div>
        <section className={open ? "menu active" : "menu"}>
          <Link to="/">Home</Link>
          <Link to="/">About</Link>
          <Link to="/">Contact</Link>
          <Link to="/">Agents</Link>
          <Link to="/">Sign in</Link>
          <Link to="/">Sign up</Link>
        </section>
      </section>
    </nav>
  );
};

export default Navbar;
