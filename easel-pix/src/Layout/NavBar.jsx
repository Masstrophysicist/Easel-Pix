import { Link } from "react-router";

const NavBar = ({ user }) => {
  return (
    <nav>
      <Link to="/">Home</Link>
      <Link to="/feed">Easel-Pix</Link>
      {user.id ? (
        <span>
          <Link to="#">Notifications</Link>
          <Link to="/me">About Me</Link>
        </span>
      ) : (
        <span>
          <Link to="/login">Login</Link>
        </span>
      )}
    </nav>
  );
};

export default NavBar;
