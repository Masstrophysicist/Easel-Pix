import axios from "axios";
import { useNavigate } from "react-router";

const RegisterForm = ({ setUser }) => {
  const navigate = useNavigate();
  const register = async (formData) => {
    const username = formData.get("username");
    const password = formData.get("password");
    const user = {
      username,
      password,
    };
    try {
      const { data } = await axios.post("/api/auth/register", user);
      const token = data.token;
      window.localStorage.setItem("token", token);
      setUser({ token });
      navigate("/");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form action={register}>
      <div>
        <label>
          Username:
          <input type="text" name="username" />
        </label>
      </div>
      <div>
        <label>
          Display Name:
          <input type="text" name="displayName" />
        </label>
      </div>
      <div>
        <label>
          Password:
          <input type="password" name="password" />
        </label>
      </div>
      <button type="submit"> Register </button>
    </form>
  );
};

export default RegisterForm;
