import React from "react";
// import "./settings.css";
import "../Layout/NavBar";

function AboutMe() {
  return (
    <>
      <header>
        <a href="#">Search</a>
        <a href="/feed">Easel-Pix</a>
        <nav>
          <a href="/home">Home</a>
          <a href="#">Notifications</a>
          <a href="/profile">Profile</a>
        </nav>
      </header>

      <main>
        <section>
          <div>
            <h1>Welcome to Your Profile [user]</h1>
          </div>
        </section>
      </main>

      <footer>Footer here</footer>
    </>
  );
}

export default AboutMe;
