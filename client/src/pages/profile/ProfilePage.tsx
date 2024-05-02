import { Link, useNavigate } from "react-router-dom";
import Chat from "../../components/chat/Chat";
import List from "../../components/list/List";
import apiRequest from "../../data/apiRequest";
import "./profilePage.scss";
import { useAuthContext } from "../../context/AuthContext";

const ProfilePage = () => {
  const { currentUser, updateUser } = useAuthContext();

  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      const res = await apiRequest.post("/auth/logout");

      if (res.data) {
        updateUser(null);
        navigate("/");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <section className="profilePage">
      <section className="details">
        <section className="wrapper">
          <section className="title">
            <h1>User Information</h1>
            <Link to="/profile/update">
              <button>Update Profile</button>
            </Link>
          </section>

          <section className="info">
            <span>
              Avatar:{" "}
              <img
                src={currentUser?.avatar || "noavatar.jpg"}
                alt={currentUser?.username}
              />{" "}
            </span>

            <span>
              Username: <b>{currentUser?.username}</b>
            </span>
            <span>
              Email: <b>{currentUser?.email}</b>
            </span>
            <button onClick={handleLogout}>Logout</button>
          </section>

          <section className="title">
            <h1>My List</h1>
            <button>Create New Post</button>
          </section>
          <List />

          <section className="title">
            <h1>Saved List</h1>
          </section>
          <List />
        </section>
      </section>

      <section className="chatContainer">
        <section className="wrapper">
          <Chat />
        </section>
      </section>
    </section>
  );
};

export default ProfilePage;
