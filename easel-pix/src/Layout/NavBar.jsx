import { Link } from "react-router";
import "./NavBar.css";

const NavBar = ({ user }) => {
  return (
    <nav className="NavBar">
      <form className="Search">
        <input type="text" name="search" />
        <button type="submit">Search</button>
      </form>
      <div className="Logo">
        <Link to="/feed">Easel-Pix</Link>
      </div>
      <div className="Options">
        <Link to="/user">Profile</Link>
        <Link to="#">Notifications</Link>
        <Link to="/login">Log-In</Link>
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
