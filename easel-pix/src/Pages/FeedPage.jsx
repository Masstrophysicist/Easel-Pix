import "./feedPage.css";
import { Link } from "react-router";
import Post from "../components/Post";
import "../App.css";

export default function FeedPage() {
  // const posts = [
  //   {
  //     id: 1,
  //     name: "Orlando",
  //     title: "JWT Authentication System",
  //     desc: "Built secure login and protected routes using JWT.",
  //     image: "https://picsum.photos/600/300?random=1",
  //   },
  //   {
  //     id: 2,
  //     name: "Zak",
  //     title: "Frontend Feed UI",
  //     desc: "Designed a clean feed layout for portfolio posts.",
  //     image: "https://picsum.photos/600/300?random=2",
  //   },
  //   {
  //     id: 3,
  //     name: "Tyler",
  //     title: "Database Schema",
  //     desc: "Created relational schema for users and posts.",
  //     image: "https://picsum.photos/600/300?random=3",
  //   },
  // ];

  return (
    <main className="pageContainer">
      <div className="welcome">
        <h1>Welcome to Easel-Pix</h1>
      </div>
      <div className="description">
        <p>
          A place for you to create your own portfolio and store all your
          creative endeavours.
        </p>
      </div>
    </main>
  );
}
