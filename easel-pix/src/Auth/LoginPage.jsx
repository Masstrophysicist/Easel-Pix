import { Link } from "react-router";
import LoginForm from "./LoginForm";
import "./auth.css";

export default function LoginPage() {
  return (
    <div className="Login">
      <h1>Welcome back to Easel-Pix! Please Login Below.</h1>
      <LoginForm />
      <Link to="/register">Need an account? Register here</Link>
    </div>
  );
}
