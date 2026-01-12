import { useState } from "react";
import NavBar from "./Layout/NavBar";
import "./App.css";
import "./index.css";
import "./Auth/AboutMe";

function App() {
  const [count, setCount] = useState(0);
  const [background, setBackground] = useState(null);

  return (
    <>
      <header>
        <NavBar></NavBar>
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

      <footer>Footer here</footer>
    </>
  );
}

export default App;
