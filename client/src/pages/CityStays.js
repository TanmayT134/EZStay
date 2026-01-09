import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import API from "../services/api";
import StayCard from "../components/StayCard";
import SkeletonCard from "../components/SkeletonCard";


function CityStays() {
    const { id } = useParams();
    const [stays, setStays] = useState([]);
    const navigate = useNavigate();
    const [searchTerm, setSearchTerm] = useState("");
    const [priceRange, setPriceRange] = useState("all");
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);


    useEffect(() => {
        setLoading(true);
        setError(false);

        API.get(`/stays/city/${id}`)
            .then((res) => {
                setStays(res.data);
                setLoading(false);
            })
            .catch((err) => {
                console.error(err);
                setError(true);
                setLoading(false);
            });
    }, [id]);


    const filteredStays = stays.filter((stay) => {
        const matchesSearch =
            (stay.title || "")
                .toLowerCase()
                .includes(searchTerm.toLowerCase());

        let matchesPrice = true;

        if (priceRange === "low") {
            matchesPrice = stay.price < 2000;
        } else if (priceRange === "mid") {
            matchesPrice =
                stay.price >= 2000 && stay.price <= 4000;
        } else if (priceRange === "high") {
            matchesPrice = stay.price > 4000;
        }

        return matchesSearch && matchesPrice;
    });




    return (
        <div className="bg-light min-vh-100">
            <div className="container py-4">

                {/* SEARCH + FILTER ROW */}
                <div className="row mb-4">
                    <div className="col-md-8">
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Search stays..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>

                    <div className="col-md-4 mt-2 mt-md-0">
                        <select
                            className="form-select"
                            value={priceRange}
                            onChange={(e) => setPriceRange(e.target.value)}
                        >
                            <option value="all">All Prices</option>
                            <option value="low">Below ₹2000</option>
                            <option value="mid">₹2000 – ₹4000</option>
                            <option value="high">Above ₹4000</option>
                        </select>
                    </div>
                </div>

                {/* STAYS SECTION */}
                <h2 className="mb-4">Stays</h2>

                {loading ? (
                    <div className="row">
                        {[1, 2, 3, 4, 5, 6].map((i) => (
                            <SkeletonCard key={i} />
                        ))}
                    </div>
                ) : error ? (
                    <div className="text-center text-danger mt-5">
                        <p>Failed to load stays. Please try again later.</p>
                    </div>
                ) : filteredStays.length === 0 ? (
                    <div className="text-center text-muted mt-5">
                        <p>No stays match your search or filter.</p>
                    </div>
                ) : (
                    <div className="row">
                        {filteredStays.map((stay) => (
                            <StayCard
                                key={stay.id}
                                stay={stay}
                                onClick={() => navigate(`/stay/${stay.id}`)}
                            />
                        ))}
                    </div>
                )}


            </div>
        </div>
    );

}

export default CityStays;
