import axios from "axios";
import { useNavigate } from "react-router";
import "./auth.css";

const LoginForm = ({ setUser }) => {
  const navigate = useNavigate();
  const login = async (formData) => {
    const username = formData.get("username");
    const password = formData.get("password");
    const user = {
      username,
      password,
    };
    try {
      const { data } = await axios.post("/api/auth/login", user);
      window.localStorage.setItem("token", data.token);
      setUser({ token: data.token });
      navigate("/");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form action={login}>
      <div>
        <label>
          Username:
          <input type="text" name="username" />
        </label>
      </div>
      <div>
        <label>
          Password:
          <input type="password" name="password" />
        </label>
      </div>
      <button type="submit"> Login </button>
    </form>
  );
};

export default LoginForm;
