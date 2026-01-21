import { Link } from "react-router";
import "../App.css";
import "./userPage.css";
import { useEffect, useState } from "react";
import axios from "axios";
import PostThumbnail from "../components/PostThumbnail";
import CreatePostModal from "../components/CreatePostModal";

export default function HomePage({ setUser, user }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [posts, setPosts] = useState([]);
  const genericBanner =
    "https://www.thediscoveriesof.com/wp-content/uploads/2022/06/Mountain-Landscape-in-Colorado-Rocky-Mountains-Colorado-United-States..jpg.webp";
  const genericProfile =
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSalPUqb1gpbBibzSAKkG_3QISmsftnXoURZEc4LCnudqiy3mazEuW48k1eBclvAs75oT0SWbRGmOdHVIBUhtYIGdCC7oqOsTz0qA8nPA&s=10";

  const handleOpenModal = () => {
    console.log("going to open new post modal");
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    console.log("going to close modal");
    setIsModalOpen(false);
  };

  const getHeaders = () => {
    return {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    };
  };

  const fetchPosts = async () => {
    try {
      const response = await axios.get("/api/posts/me", getHeaders());
      console.log("Fetched posts:", response.data);
      setPosts(response.data);
    } catch (error) {
      console.log("Error fetching posts:", error.message);
    }
  };

  const handlePostCreated = (newPost) => {
    console.log("New post created:", newPost);
    setPosts((prevPosts) => [newPost, ...prevPosts]);
  };

  useEffect(() => {
    console.log("User", user);
  }, [user]);

  useEffect(() => {
    const fetchUser = async () => {
      try {
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
    fetchPosts();
  }, []);

  return (
    <main className="background">
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
          {}
          <PostThumbnail
            key="new-post-button"
            index={0}
            post={{ id: "new-post", title: "", description: "", image: "" }}
            onNewPostClick={handleOpenModal}
          />
          {}
          {posts.map((post) => (
            <PostThumbnail
              key={post.id}
              index={1}
              post={post}
              onNewPostClick={handleOpenModal}
            />
          ))}
        </div>
      </div>

      <CreatePostModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onPostCreated={handlePostCreated}
      />
    </main>
  );
}
