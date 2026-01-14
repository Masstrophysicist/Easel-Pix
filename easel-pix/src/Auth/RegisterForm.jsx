import axios from "axios";
import { useNavigate } from "react-router";
import { useRef } from "react";

const RegisterForm = ({ setUser }) => {
  const navigate = useNavigate();
  const usernameRef = useRef();
  const passwordRef = useRef();

  const register = async () => {
    const username = usernameRef.current.value;
    const password = passwordRef.current.value;

    try {
      const { data } = await axios.post("/api/users", { username, password });

      //Register does not give a token so just navigate to login//
      console.log("Registered user:", data);
      navigate("/login");
    } catch (error) {
      console.error(error.response?.data || error);
    }
  };

  return (
    <form>
      <div>
        <label>
          Username:
          <input type="text" ref={usernameRef} />
        </label>
      </div>

      <div>
        <label>
          Password:
          <input type="password" ref={passwordRef} />
        </label>
      </div>

      <button type="button" onClick={register}>
        Register
      </button>
    </form>
  );
};

export default RegisterForm;
