import { useState, useEffect } from "react";
import AuthModal from "./components/AuthModal";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import CityStays from "./pages/CityStays";
import StayDetails from "./pages/StayDetails";
import Admin from "./components/Admin";
import Navbar from "./components/Navbar";

function App() {
  const [user, setUser] = useState(null);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [authMode, setAuthMode] = useState("login");


  // Load user from localStorage on refresh
  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  const handleLogin = (userData) => {
    localStorage.setItem("user", JSON.stringify(userData));
    setUser(userData);
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    setUser(null);
    window.location.href = "/";
  };


  return (
    <BrowserRouter>
      {/* 1️⃣ NAVBAR */}
      <Navbar
        user={user}
        onLogout={handleLogout}
        setShowAuthModal={setShowAuthModal}
        setAuthMode={setAuthMode}
      />

      {/* 2️⃣ PAGES */}
      <Routes>
        <Route
          path="/"
          element={
            <><Home />
            </>
          }
        />

        <Route
          path="/admin"
          element={
            user && user.role === "admin" ? <Admin /> : <Home />
          }
        />


        <Route path="/city/:id" element={<CityStays />} />
        <Route path="/stay/:id" element={<StayDetails />} />
      </Routes>

      {/* 3️⃣ AUTH MODAL (GLOBAL UI) */}
      <AuthModal
        show={showAuthModal}
        onClose={() => setShowAuthModal(false)}
        mode={authMode}
        setMode={setAuthMode}
        onLoginSuccess={(userData) => {
          handleLogin(userData);
          setShowAuthModal(false);

          if (userData.role === "admin") {
            window.location.href = "/admin";
          } else {
            window.location.href = "/";
          }

        }}
      />


    </BrowserRouter>
  );

}

export default App;
