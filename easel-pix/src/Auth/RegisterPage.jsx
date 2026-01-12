import { Link } from "react-router";
import RegisterForm from "./RegisterForm";
import "./auth.css";

export function RegisterPage({ authenticate }) {
  return (
    <div className="Register">
      <h1>Welceom to Easel-Pix!</h1>
      <h2>Register for an account below.</h2>
      <RegisterForm authenticate={authenticate} />
      <Link to="/login">Already have an account? Log in here.</Link>
    </div>
  );
}
