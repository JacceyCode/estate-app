import { Suspense } from "react";
import { Await, Link, useLoaderData, useNavigate } from "react-router-dom";
import Chat from "../../components/chat/Chat";
import List from "../../components/list/List";
import apiRequest from "../../data/apiRequest";
import "./profilePage.scss";
import { useAuthContext } from "../../context/AuthContext";
import { ProfileDataProp } from "../../types/data";

const ProfilePage = () => {
  const data = useLoaderData() as ProfileDataProp;
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
            <Link to="/add">
              <button>Create New Post</button>
            </Link>
          </section>

          <Suspense fallback={<p>Loading data...</p>}>
            <Await
              resolve={data.postResponse}
              errorElement={<p>Error loading posts...</p>}
            >
              {(postResponse) => <List posts={postResponse.data.userPosts} />}
            </Await>
          </Suspense>

          <section className="title">
            <h1>Saved List</h1>
          </section>
          <Suspense fallback={<p>Loading data...</p>}>
            <Await
              resolve={data.postResponse}
              errorElement={<p>Error loading posts...</p>}
            >
              {(postResponse) => <List posts={postResponse.data.savedPosts} />}
            </Await>
          </Suspense>
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
