import { FormEvent, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./login.scss";
import apiRequest from "../../data/apiRequest";
import { isAxiosError } from "axios";
import { useAuthContext } from "../../context/AuthContext";

const Login = () => {
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const { updateUser } = useAuthContext();

  const navigate = useNavigate();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");
    const formData = new FormData(e.target as HTMLFormElement);

    const username = formData.get("username");
    const password = formData.get("password");

    try {
      const res = await apiRequest.post("/auth/login", {
        username,
        password,
      });

      updateUser(res.data);

      navigate("/");
    } catch (err) {
      if (isAxiosError(err)) {
        setError(err.response!.data.message);
      } else {
        console.error(err);
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="login">
      <section className="formContainer">
        <form onSubmit={handleSubmit}>
          <h1>Welcome back</h1>
          <input
            name="username"
            required
            minLength={3}
            maxLength={20}
            type="text"
            placeholder="Username"
          />
          <input
            name="password"
            type="password"
            required
            placeholder="Password"
          />
          <button disabled={isLoading}>Login</button>
          {error && <span>{error}</span>}
          <Link to="/register">{"Don't"} you have an account?</Link>
        </form>
      </section>
      <div className="imgContainer">
        <img src="/bg.png" alt="" />
      </div>
    </section>
  );
};

export default Login;
