import { useState, useEffect } from "react";
import NavBar from "./Layout/NavBar";
import "./App.css";
import "./index.css";
import "./Auth/AboutMe";
// import "./Posts/posts.css";

function App() {
  const [count, setCount] = useState(0);
  const [background, setBackground] = useState(null);

  // useEffect(() => {
  //   const fetchImages = async () => {
  //     try {
  //       // Replace with our actual API endpoint
  //       const response = await fetch(
  //         "https://github.com/Masstrophysicist/Easel-Pix/easel-pix/server/images"
  //       );
  //       const data = await response.json();

  //       setProfileData({
  //         backgroundUrl: data.backgroundImage, // Matches your DB column name
  //         profilePicUrl: data.profileImage,
  //       });
  //     } catch (error) {
  //       console.error("Error fetching images:", error);
  //     }
  //   };
  //   fetchImages();
  // }, []);

  return (
    <>
      <header>
        <NavBar></NavBar>
      </header>

      <main>
        <section className="images">
          <div>
            <div className="background">
              <img
              // src=
              // alt="Background"
              />
            </div>
            <div className="profilePicture">
              <img
              // src=
              // alt="Profile"
              />
            </div>
          </div>
        </section>
      </main>

      <main className="posts">
        <div className="accountNav">
          <section>
            <ul>Posts</ul>
            <ul>Favorites</ul>
            <ul>Followers</ul>
            <ul>Following</ul>
          </section>
        </div>

        <div className="List">Hello</div>

        {/* <div className="postBack">
          {posts.length === 0 ? (
            <div className="postBody">
              <h1>No posts yet</h1>
            </div>
          ) : (
            posts.map((post) => (
              <div className="postBody" key={post.id}>
                <h1>{post.title}</h1>
              </div>
            ))
          )}
        </div> */}
      </main>

      <footer>Easel-Pix by Mastrophysicists</footer>
    </>
  );
}

export default App;
