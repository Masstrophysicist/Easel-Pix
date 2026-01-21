import { useState, useEffect } from "react";
import axios from "axios";
import NavBar from "./Layout/NavBar";
import "./App.css";
import "./index.css";
import "./Auth/AboutMe";
import { Routes, Route } from "react-router";
import HomePage from "./Pages/HomePage";
import LoginPage from "./Auth/LoginPage";
import FeedPage from "./Pages/FeedPage";
import RegisterPage from "./Auth/RegisterPage";
import PostDetailPage from "./Pages/PostDetailPage";

function App() {
  // const [count, setCount] = useState(0);
  // const [background, setBackground] = useState(null);
  const [user, setUser] = useState(null);
  const getHeaders = () => {
    return {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    };
  };

  const authorization = async () => {
    if (localStorage.getItem("token")) {
      const { data } = await axios.get("/api/auth/me", getHeaders());
      setUser(data);
    }
  };

  useEffect(() => {
    authorization();
  }, []);

  return (
    <div>
      <header>
        <NavBar user={user} setUser={setUser} />
      </header>

      <main className="whole">
        <Routes>
          <Route
            exact
            path="/user"
            element={<HomePage setUser={setUser} user={user} />}
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
          <Route
            exact
            path="/posts/:id"
            element={<PostDetailPage user={user} />}
          />
        </Routes>
      </main>

      <footer className="footer">Easel-Pix by Mastrophysicists</footer>
    </div>
  );
}

export default App;
