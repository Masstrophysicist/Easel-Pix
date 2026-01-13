import { Link } from "react-router";
import "./NavBar.css";

const NavBar = ({ user, setUser }) => {
  const logout = () => {
    window.localStorage.removeItem("token");
    setUser(null);
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
        {user?.token ? (
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
    </nav>
  );
};

export default NavBar;
