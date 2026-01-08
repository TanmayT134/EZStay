import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import API from "../services/api";
import StayCard from "../components/StayCard";

function CityStays() {
    const { id } = useParams();
    const [stays, setStays] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        API.get(`/stays/city/${id}`)
            .then((res) => setStays(res.data))
            .catch((err) => console.error(err));
    }, [id]);

    return (
        <div className="container mt-4">
            <h2 className="mb-4">Stays</h2>

            {stays.length === 0 ? (
                <p>No stays available.</p>
            ) : (
                <div className="row">
                    {stays.map((stay) => (
                        <StayCard
                            key={stay.id}
                            stay={stay}
                            onClick={() => navigate(`/stay/${stay.id}`)}
                        />
                    ))}
                </div>
            )}
        </div>
    );
}

export default CityStays;
