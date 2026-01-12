import { Link } from "react-router";
import "../App.css";

export default function HomePage() {
  const bgUrl =
    "https://www.thediscoveriesof.com/wp-content/uploads/2022/06/Mountain-Landscape-in-Colorado-Rocky-Mountains-Colorado-United-States..jpg.webp";
  const profileUrl =
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSalPUqb1gpbBibzSAKkG_3QISmsftnXoURZEc4LCnudqiy3mazEuW48k1eBclvAs75oT0SWbRGmOdHVIBUhtYIGdCC7oqOsTz0qA8nPA&s=10";
  return (
    <div>
      <div
        style={{
          backgroundImage: `url(${bgUrl})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          height: "300px",
          width: "100%",
          position: "relative",
          marginBottom: "60px",
          marginTop: "20px",
        }}
      >
        <div
          style={{
            position: "absolute",
            bottom: "-50px",
            left: "40px",
            width: "120px",
            height: "120px",
            borderRadius: "50%",
            border: "5px solid white",
            backgroundImage: `url(${profileUrl})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundColor: "#ccc",
          }}
        ></div>
        <div
          style={{
            position: "absolute",
            bottom: "-85px", // Positioned below the profile picture
            left: "40px", // Aligned with the left edge of the profile pic
            fontSize: "24px",
            fontWeight: "bold",
            color: "#333",
            marginBottom: "5px",
            marginLeft: "5px",
          }}
        >
          Orlando Alata
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
              {/* If you have images from your database, they would go here */}
              <div className="post-content-area">
                {/* img tag goes here later */}
              </div>

              <div className="post-footer">
                {index === 0 ? "New Post +" : `Project ${index}`}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
