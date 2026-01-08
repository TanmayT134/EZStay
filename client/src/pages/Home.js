import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";
import CityCard from "../components/CityCard";

function Home() {
    const [cities, setCities] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        API.get("/cities")
            .then((res) => setCities(res.data))
            .catch((err) => console.error(err));
    }, []);

    return (
        <div className="container mt-4">
            <h2 className="mb-4">Available Cities</h2>

            <div className="row">
                {cities.map((city) => (
                    <CityCard
                        key={city.id}
                        city={city}
                        onClick={() => navigate(`/city/${city.id}`)}
                    />
                ))}
            </div>
        </div>
    );
}

export default Home;
