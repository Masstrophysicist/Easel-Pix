import { Link } from "react-router";
import "./NavBar.css";

const NavBar = ({ user }) => {
  return (
    <nav className="NavBar">
      <form className="Search">
        <input type="text" name="search" />
        <button type="submit">Search</button>
      </form>
      <Link to="/feed">Easel-Pix</Link>
      <Link to="/">Home</Link>

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
