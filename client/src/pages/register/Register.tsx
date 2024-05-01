import { FormEvent, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./register.scss";
import apiRequest from "../../data/apiRequest";
import { isAxiosError } from "axios";

const Register = () => {
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);
    const formData = new FormData(e.target as HTMLFormElement);

    const username = formData.get("username");
    const email = formData.get("email");
    const password = formData.get("password");

    try {
      const res = await apiRequest.post("/auth/register", {
        username,
        email,
        password,
      });

      if (res) navigate("/login");
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
    <section className="registerPage">
      <section className="formContainer">
        <form onSubmit={handleSubmit}>
          <h1>Create an Account</h1>
          <input name="username" type="text" placeholder="Username" />
          <input name="email" type="text" placeholder="Email" />
          <input name="password" type="password" placeholder="Password" />
          <button disabled={isLoading}>Register</button>
          {error && <span>{error}</span>}
          <Link to="/login">Do you have an account?</Link>
        </form>
      </section>
      <section className="imgContainer">
        <img src="/bg.png" alt="" />
      </section>
    </section>
  );
};

export default Register;
