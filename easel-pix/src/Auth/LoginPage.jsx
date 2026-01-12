import { Link } from "react-router";
import LoginForm from "./LoginForm";

export function LoginPage() {
  return (
    <div>
      <LoginForm />
      <div>
        <Link to="/register">Need an account? Register here</Link>
      </div>
    </div>
  );
}
