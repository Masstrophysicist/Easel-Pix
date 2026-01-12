import { Link } from "react-router";
import "./NavBar.css";

const NavBar = ({ user, setUser }) => {
  const logout = () => {
    window.localStorage.removeItem("token");
    setUser({});
  };
  return (
    <nav className="NavBar">
      <form className="Search">
        <input type="text" name="search" />
        <button type="submit">Search</button>
      </form>
      <div className="Logo">
        <Link to="/">Easel-Pix</Link>
      </div>
      <div className="Options">
        {user?.id ? (
          <span>
            <Link to="/user">Profile</Link>
            <Link to="#">Notifications</Link>
            <Link onClick={logout} to="/">
              Logout
            </Link>
          </span>
        ) : (
          <span>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </span>
        )}
      </div>

      {/* {user.id ? (
        <span>
          <Link to="#">Notifications</Link>
          <Link to="./Auth/AboutMe">About Me</Link>
        </span>
      ) : (
        <span>
          <Link to="./LoginPage">Login</Link>
        </span>
      )} */}
    </nav>
  );
};

export default NavBar;
