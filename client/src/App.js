import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useEffect, useState } from "react";
import Home from "./pages/Home";
import CityStays from "./pages/CityStays";
import StayDetails from "./pages/StayDetails";
import Login from "./components/Login";
import Admin from "./components/Admin";
import Navbar from "./components/Navbar";

function App() {
  const [user, setUser] = useState(null);

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
    setUser(null);
  };

  return (
    <BrowserRouter>
      <Navbar user={user} onLogout={handleLogout} />

      <Routes>
        <Route
          path="/"
          element={
            <>
              {!user && <Login onLogin={handleLogin} />}

              {user && user.role === "admin" && <Admin />}

              <Home />
            </>
          }
        />

        <Route path="/city/:id" element={<CityStays />} />
        <Route path="/stay/:id" element={<StayDetails />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
