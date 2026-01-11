import React from "react";
import "./styleFeed.css";
import "./Layout/NavBar";

function Feed() {
  return (
    <>
      <header>
        <a href="#">Search</a>
        <a href="/feed">Easel-Pix</a>

        <nav>
          <a href="/home">Home</a>
          <a href="#">Notifications</a>
          <a href="/Auth/AboutMe">Profile</a>
        </nav>
      </header>

      <main>
        <section>
          <div>
            <h1>Welcome to Easel Pix</h1>
          </div>
        </section>
      </main>

      <footer>Footer here</footer>
    </>
  );
}

export default Feed;
