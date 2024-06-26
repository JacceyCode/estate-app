import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./navbar.scss";
import { useAuthContext } from "../../context/AuthContext";
import { useNotificationStore } from "../../context/notificationStore";

const Navbar = () => {
  const [open, setOpen] = useState(false);

  const { currentUser } = useAuthContext();

  const fetchCount = useNotificationStore((state) => state.fetchCount);
  const notificationCount = useNotificationStore((state) => state.count);

  useEffect(() => {
    if (currentUser) fetchCount();
  }, [currentUser, fetchCount, notificationCount]);

  return (
    <nav>
      <section className="left">
        <Link to="/" className="logo">
          <img src="/logo.png" alt="logo" />
          <span>SeronEstate</span>
        </Link>

        <Link to="/">Home</Link>
        {/* <Link to="/">About</Link> */}
        {/* <Link to="/list">Contact</Link> */}
        <Link to="/list">Rentals</Link>
      </section>

      <section className="right">
        {currentUser ? (
          <section className="user">
            <img
              src={currentUser.avatar || "/noavatar.jpg"}
              alt={currentUser.username}
            />
            <span>{currentUser.username}</span>
            <Link to="/profile">
              {notificationCount > 0 && (
                <div className="notification">{notificationCount}</div>
              )}
              <span>Profile</span>
            </Link>
          </section>
        ) : (
          <>
            <Link to="/login">Sign in</Link>
            <Link to="/register" className="register">
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
          {/* <Link to="/">About</Link> */}
          {/* <Link to="/list">Contact</Link> */}
          <Link to="/list">Rentals</Link>
          <Link to="/login">Sign in</Link>
          <Link to="/register">Sign up</Link>
        </section>
      </section>
    </nav>
  );
};

export default Navbar;
