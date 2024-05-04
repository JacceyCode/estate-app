import { FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../../context/AuthContext";
import { isAxiosError } from "axios";
import "./profileUpdatePage.scss";
import apiRequest from "../../data/apiRequest";
import UploadWidget from "../../components/uploadWidget/UploadWidget";

const ProfileUpdatePage = () => {
  const { currentUser, updateUser } = useAuthContext();
  const [error, setError] = useState("");
  const [avatar, setAvatar] = useState(currentUser?.avatar);

  const navigate = useNavigate();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");

    const formData = new FormData(e.target as HTMLFormElement);

    const { username, email, password } = Object.fromEntries(formData);

    try {
      const res = await apiRequest.put(`/user/${currentUser?.id}`, {
        username,
        email,
        password,
        avatar,
      });

      updateUser(res.data);
      navigate("/profile");
    } catch (error) {
      console.log(error);
      if (isAxiosError(error)) setError(error.response?.data.message);
    }
  };

  return (
    <section className="profileUpdatePage">
      <section className="formContainer">
        <form onSubmit={handleSubmit}>
          <h1>Update Profile</h1>
          <section className="item">
            <label htmlFor="username">Username</label>
            <input
              id="username"
              name="username"
              type="text"
              defaultValue={currentUser!.username}
            />
          </section>
          <section className="item">
            <label htmlFor="email">Email</label>
            <input
              id="email"
              name="email"
              type="email"
              defaultValue={currentUser!.email}
            />
          </section>
          <section className="item">
            <label htmlFor="password">Password</label>
            <input id="password" name="password" type="password" />
          </section>
          <button>Update</button>
          {error && <span>error</span>}
        </form>
      </section>
      <section className="sideContainer">
        <img
          src={avatar || "/noavatar.jpg"}
          alt={currentUser?.username}
          className="avatar"
        />
        <UploadWidget
          uwConfig={{
            cloudName: "jacceycode",
            uploadPreset: "estate",
            multiple: false,
            maxImageFileSize: 2000000,
            folder: "avatars",
          }}
          setPublicId={setAvatar}
        />
      </section>
    </section>
  );
};

export default ProfileUpdatePage;
