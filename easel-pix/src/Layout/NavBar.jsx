import { Link } from "react-router";
import "./NavBar.css";

const NavBar = ({ user, setUser }) => {
  const profileUrl =
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSalPUqb1gpbBibzSAKkG_3QISmsftnXoURZEc4LCnudqiy3mazEuW48k1eBclvAs75oT0SWbRGmOdHVIBUhtYIGdCC7oqOsTz0qA8nPA&s=10";
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
            <Link to="/user">Profile </Link>
            <Link to="#">Notifications </Link>
            <Link onClick={logout} to="/">
              Logout
            </Link>
            {/* <div
              className="Icon"
              style={{ backgroundImage: `url(${profileUrl})` }}
            /> */}
          </span>
        ) : (
          <span>
            <Link to="/login">Login </Link>
            <Link to="/register">Register</Link>
          </span>
        )}
      </div>
    </nav>
  );
};

export default NavBar;
