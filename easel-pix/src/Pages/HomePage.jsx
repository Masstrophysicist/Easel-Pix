import { Link } from "react-router";
import "../App.css";
import "./userPage.css";
import { useEffect } from "react";
import axios from "axios";

export default function HomePage({ setUser, user }) {
  const genericBanner =
    "https://www.thediscoveriesof.com/wp-content/uploads/2022/06/Mountain-Landscape-in-Colorado-Rocky-Mountains-Colorado-United-States..jpg.webp";
  const genericProfile =
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSalPUqb1gpbBibzSAKkG_3QISmsftnXoURZEc4LCnudqiy3mazEuW48k1eBclvAs75oT0SWbRGmOdHVIBUhtYIGdCC7oqOsTz0qA8nPA&s=10";

  useEffect(() => {
    console.log("User", user);
  }, [user]);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const getHeaders = () => {
          return {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          };
        };
        const response = await axios.get("/api/auth/me", getHeaders());
        // console.log("Hello User", response);
        const fetchedUser = response.data;
        setUser((prevUser) => ({ ...prevUser, ...fetchedUser }));
        // console.log("UE_Picture", user.banner);
      } catch (error) {
        console.log("Error fetching user", error.message);
      }
    };

    fetchUser();
  }, []);

  return (
    <body>
      <div>
        <div
          className="backgroundPic"
          style={{
            backgroundImage: `url(${user?.banner || genericBanner})`,
          }}
        >
          <div
            className="profilePicBorder"
            style={{
              backgroundImage: `url(${user?.profilepicture || genericProfile})`,
            }}
          ></div>
          <div className="profileName">
            {user?.displayname} - {user?.biography}
          </div>
        </div>

        <div className="posts">
          <div className="accountNav">
            <Link to="#">Posts</Link>
            <Link to="#">Favorites</Link>
            <Link to="#">Followers</Link>
            <Link to="#">Following</Link>
          </div>

          <div className="List">
            {Array.from({ length: 10 }).map((_, index) => (
              <div key={index} className="post-item">
                {/*database images go here */}
                <div className="post-content-area">
                  {/* post img tag goes here later */}
                </div>

                <div className="post-footer">
                  {index === 0 ? "New Post +" : `Project ${index}`}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </body>
  );
}
