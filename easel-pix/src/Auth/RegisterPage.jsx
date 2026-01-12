import { Link } from "react-router";
import RegisterForm from "./RegisterForm";
import "./auth.css";

export function RegisterPage({ setUser }) {
  return (
    <div className="Register">
      <h1>Welcome to Easel-Pix!</h1>
      <h2>Register for an account below.</h2>
      <RegisterForm setUser={setUser} />
      <Link to="/login">Already have an account? Log in here.</Link>
    </div>
  );
}
