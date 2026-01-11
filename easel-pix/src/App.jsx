import { useState } from "react";
import "./App.css";
import "./index.css";
import "./Auth/AboutMe";
import "./Layout/NavBar";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <header>
        <a>Search</a>
        <a href="/feed">Easel-Pix</a>
        <nav>
          <a>Home</a>
          <a>Notifications</a>
          <a href="./Auth/AboutMe">Profile</a>
        </nav>
      </header>

      <main>
        <section>
          <div className="images">
            <div className="background">
              <img
              // src=
              // alt="Background"
              />

              <div className="profilePicture">
                <img
                // src=
                // alt="Profile"
                />
              </div>
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

        <div className="postBack">
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
        </div>
      </main>

      <footer>Footer here</footer>
    </>
  );
}

export default App;
