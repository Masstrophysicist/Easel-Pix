import { Link } from "react-router";
import LoginForm from "./LoginForm";
import "./auth.css";
import "../App.css";

export default function LoginPage({ setUser }) {
  return (
    <div className="Login">
      <h1>Welcome back to Easel-Pix! Please Login Below.</h1>
      <LoginForm setUser={setUser} />
      <Link to="/register">Need an account? Create an account here</Link>
    </div>
  );
}
