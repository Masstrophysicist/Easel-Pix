import { Link } from "react-router";

const NavBar = ({ user }) => {
  return (
    <nav>
      <form action={searchArt}>
        <input type="text" name="search" />
        <button type="submit">Search</button>
      </form>
      <Link to="/">Home</Link>
      <Link to="/feed">Easel-Pix</Link>
      {user.id ? (
        <span>
          <Link to="#">Notifications</Link>
          <Link to="./Auth/AboutMe">About Me</Link>
        </span>
      ) : (
        <span>
          <Link to="./LoginPage">Login</Link>
        </span>
      )}
    </nav>
  );
};

export default NavBar;
