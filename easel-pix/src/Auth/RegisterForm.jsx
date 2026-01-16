import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useRef, useState } from "react";

export default function Register() {
  const navigate = useNavigate();
  const usernameRef = useRef();
  const displaynameRef = useRef();
  const passwordRef = useRef();
  const [error, setError] = useState("");

  const register = async () => {
    setError("");

    const username = usernameRef.current.value.trim();
    const password = passwordRef.current.value.trim();
    const displayname = (displaynameRef.current.value || "").trim() || username;

    try {
      await axios.post("/api/users", {
        username,
        password,
        displayname,
        biography: "",
      });

      alert("Account created!");
      navigate("/login");
    } catch (err) {
      setError(err.response?.data?.error || "Register failed");
    }
  };

  return (
    <div>
      <h2>Register</h2>

      <div>
        <label>
          Username:
          <input ref={usernameRef} type="text" />
        </label>
      </div>

      <div>
        <label>
          Display Name:
          <input ref={displaynameRef} type="text" />
        </label>
      </div>

      <div>
        <label>
          Password:
          <input ref={passwordRef} type="password" />
        </label>
      </div>

      {error && <p style={{ color: "red" }}>{error}</p>}

      <button onClick={register}>Register</button>
    </div>
  );
}
