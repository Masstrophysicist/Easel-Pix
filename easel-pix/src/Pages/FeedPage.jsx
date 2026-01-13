import "./feedPage.css";
import { Link } from "react-router";

export default function FeedPage() {
  const posts = [
    {
      id: 1,
      name: "Orlando",
      title: "JWT Authentication System",
      desc: "Built secure login and protected routes using JWT.",
      image: "https://picsum.photos/600/300?random=1",
    },
    {
      id: 2,
      name: "Zak",
      title: "Frontend Feed UI",
      desc: "Designed a clean feed layout for portfolio posts.",
      image: "https://picsum.photos/600/300?random=2",
    },
    {
      id: 3,
      name: "Tyler",
      title: "Database Schema",
      desc: "Created relational schema for users and posts.",
      image: "https://picsum.photos/600/300?random=3",
    },
  ];

  return (
    <div className="feedContainer">
      <div className="feedWrapper">
        <div className="feedTopNav"></div>

        <div className="feedList">
          {posts.map((post) => (
            <div key={post.id} className="feedPost">
              <img src={post.image} alt="post art" className="feedImage" />
              <h4 className="postTitle">{post.title}</h4>

              <p className="postAuthor">by {post.name}</p>

              <p className="postDesc">{post.desc}</p>

              <div className="postActions">
                <div className="postActions">
                  <button className="iconBtn">♡</button>
                  <button className="iconBtn">💬</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
