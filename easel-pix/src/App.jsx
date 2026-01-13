import { useState, useEffect } from "react";
import axios from "axios";
import NavBar from "./Layout/NavBar";
import "./App.css";
import "./index.css";
import "./Auth/AboutMe";
import { Routes, Route } from "react-router";
import HomePage from "./Pages/Homepage";
import LoginPage from "./Auth/LoginPage";
import FeedPage from "./Pages/FeedPage";
import RegisterPage from "./Auth/RegisterPage";

function App() {
  const [count, setCount] = useState(0);
  const [background, setBackground] = useState(null);
  const [profileData, setProfileData] = useState({
    backgroundUrl: "",
    profilePicUrl: "",
  });
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const response = await axios.get("/api/images");
        setProfileData({
          backgroundUrl: response.data.bannerPicture,
          profilePicUrl: response.data.profilePicture,
        });
      } catch (error) {
        console.error("Error fetching images", error.message);
      }
    };

    fetchImages();
  }, []);

  useEffect(() => {
    const fetchUser = async () => {
      try {
      } catch (error) {
        console.log("Error fetching user", error.message);
      }
    };

    fetchUser;
  }, []);

  return (
    <>
      <header>
        <NavBar user={user} setUser={setUser}></NavBar>
      </header>

      <main>
        <Routes>
          <Route
            exact
            path="/user"
            element={<HomePage user={user} setProfileData={setProfileData} />}
          />
          <Route exact path="/" element={<FeedPage />} />
          <Route
            exact
            path="/login"
            element={<LoginPage setUser={setUser} />}
          />
          <Route
            exact
            path="/register"
            element={<RegisterPage setUser={setUser} />}
          />
        </Routes>
      </main>

      <footer className="footer">Easel-Pix by Mastrophysicists</footer>
    </>
  );
}

export default App;
