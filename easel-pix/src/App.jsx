import { useState, useEffect } from "react";
import axios from "axios";
import NavBar from "./Layout/NavBar";
import "./App.css";
import "./index.css";
import "./Auth/AboutMe";
import { Routes, Route } from "react-router";
import HomePage from "./Pages/Homepage";
import { LoginPage } from "./Auth/LoginPage";
import FeedPage from "./Pages/FeedPage";
// import "./Posts/posts.css";

function App() {
  const [count, setCount] = useState(0);
  const [background, setBackground] = useState(null);
  const [profileData, setProfileData] = useState({
    backgroundUrl: "",
    profilePicUrl: "",
  });

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const response = await axios.get("http://localhost:5173/api/posts");
        setProfileData({
          backgroundUrl: response.data.backgroundImage,
          profilePicUrl: response.data.profileImage,
        });
      } catch (error) {
        console.error("Error fetching images", error.message);
      }
    };

    fetchImages();
  }, []);

  return (
    <>
      <header>
        <NavBar></NavBar>
      </header>

      <main>
        <Routes>
          <Route exact path="/" element={<HomePage />} />
          <Route exact path="/feed" element={<FeedPage />} />
          <Route exact path="/login" element={<LoginPage />} />
        </Routes>
      </main>

      <footer>Easel-Pix by Mastrophysicists</footer>
    </>
  );
}

export default App;
