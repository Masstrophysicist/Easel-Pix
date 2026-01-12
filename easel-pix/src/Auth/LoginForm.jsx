import axios from "axios";
import { useNavigate } from "react-router";
import "./auth.css";

const LoginForm = (authenticate) => {
  const navigate = useNavigate();
  const login = async (formData) => {
    const username = formData.get("username");
    const password = formData.get("password");
    const user = {
      username,
      password,
    };
    try {
      const { data } = await axios.post("/api/login", user);
      window.localStorage.setItem("token", data.token);
      authenticate();
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

/* Log Out Button Code:
  Place this code under the declared component:
    const logOut = () => {
      setUser({});
      };
<button onClick={() => {logOut()}}>Log Out</button> */
