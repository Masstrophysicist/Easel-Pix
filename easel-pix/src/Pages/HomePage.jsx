import { Link } from "react-router";

export default function HomePage() {
  return (
    <div>
      <div className="tempBG"></div>
      <div className="posts">
        <div className="accountNav">
          <Link to="#">Posts</Link>
          <Link to="#">Favorites</Link>
          <Link to="#">Followers</Link>
          <Link to="#">Following</Link>
        </div>

        <div className="List">
          {Array.from({ length: 15 }).map((_, index) => (
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
