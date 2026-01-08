import Admin from "./components/Admin";
import { useEffect, useState } from "react";
import API from "./services/api";
import Login from "./components/Login";

function App() {
  const [cities, setCities] = useState([]);
  const [stays, setStays] = useState([]);
  const [selectedCity, setSelectedCity] = useState(null);
  const [user, setUser] = useState(null);

  // Fetch cities
  useEffect(() => {
    API.get("/cities")
      .then((res) => setCities(res.data))
      .catch((err) => console.error(err));
  }, []);

  // Fetch stays
  const fetchStays = (city) => {
    setSelectedCity(city);
    API.get(`/stays/city/${city.id}`)
      .then((res) => setStays(res.data))
      .catch((err) => console.error(err));
  };

  return (
    <div className="container mt-5">
      <h1 className="mb-4">EZStay</h1>

      {!user ? (
        <Login onLogin={setUser} />
      ) : (
        <>
          <p className="text-success">
            Logged in as <strong>{user.name}</strong>
          </p>
          <Admin />
        </>
      )}


      {/* Cities */}
      <h4>Available Cities</h4>
      <ul className="list-group mb-4">
        {cities.map((city) => (
          <li
            key={city.id}
            className="list-group-item list-group-item-action"
            onClick={() => fetchStays(city)}
            style={{ cursor: "pointer" }}
          >
            {city.name}
          </li>
        ))}
      </ul>

      {/* Stays */}
      {selectedCity && (
        <>
          <h4>Stays in {selectedCity.name}</h4>

          {stays.length === 0 ? (
            <p>No stays available.</p>
          ) : (
            <ul className="list-group">
              {stays.map((stay) => (
                <li key={stay.id} className="list-group-item">
                  <strong>{stay.title}</strong> — ₹{stay.price}
                </li>
              ))}
            </ul>
          )}
        </>
      )}
    </div>
  );
}

export default App;
