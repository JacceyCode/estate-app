import { useNavigate } from "react-router-dom";
import Chat from "../../components/chat/Chat";
import List from "../../components/list/List";
import apiRequest from "../../data/apiRequest";
import { userData } from "../../data/dummydata";
import "./profilePage.scss";

const ProfilePage = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      const res = await apiRequest.post("/auth/logout");

      if (res.data) {
        localStorage.removeItem("user");
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
            <button>Update Profile</button>
          </section>

          <section className="info">
            <span>
              Avatar: <img src={userData.img} alt={userData.name} />{" "}
            </span>

            <span>
              Username: <b>{userData.name}</b>
            </span>
            <span>
              Email: <b>john@gmail.com</b>
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
