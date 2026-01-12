import axios from "axios";
import { useNavigate } from "react-router";
import "./Layout/NavBar";

const LoginForm = ({ authorization }) => {
  const navigate = useNavigate();
  const login = async (formData) => {
    const username = formData.get("username");
    const password = formData.get("password");
    const credentials = {
      username,
      password,
    };
    const { data } = await axios.post("/api/auth/login", credentials);
    window.localStorage.setItem("token", data.token);
    authorization();
    navigate("/");
  };
  return (
    <form action={login}>
      <h1>Login</h1>
      <label>
        Username:
        <input type="text" name="username" />
      </label>
      <label>
        Password:
        <input type="password" name="password" />
      </label>
      <button type="submit">Login</button>
    </form>
  );
};

export default LoginForm;
