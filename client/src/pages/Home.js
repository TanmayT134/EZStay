import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";
import CityCard from "../components/CityCard";
import SkeletonCard from "../components/SkeletonCard";

function Home({ onGetStarted, user }) {
    const [cities, setCities] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
    const [error, setError] = useState(false);


    useEffect(() => {
        setLoading(true);
        setError(false);

        API.get("/cities")
            .then((res) => {
                setCities(res.data);
                setLoading(false);
            })
            .catch((err) => {
                console.error(err);
                setError(true);
                setLoading(false);
            });
    }, []);



    return (
        <><div className="bg-light">
            <div className="container section text-center">
                <h1 className="fw-bold">
                    Find comfortable stays with{" "}
                    <span className="text-brand">EZStay</span>
                </h1>

                <p className="text-muted mt-3">
                    Discover affordable and comfortable stays across top tourist cities in India.
                </p>

                <div className="mt-4">
                    <a href="#cities" className="btn btn-warning btn-lg me-3">
                        Explore Cities
                    </a>

                    {!user && (
                        <button
                            className="btn btn-outline-dark btn-lg"
                            onClick={onGetStarted}
                        >
                            Get Started
                        </button>
                    )}
                </div>

            </div>
        </div>
            <div className="bg-light min-vh-100">
                <div id="cities" className="section">
                    <h2 className="section-title text-center">Popular Cities</h2>
                    <div className="container mt-4">
                        {loading ? (
                            <div className="row">
                                {[1, 2, 3, 4, 5, 6].map((i) => (
                                    <SkeletonCard key={i} />
                                ))}
                            </div>
                        ) : error ? (
                            <div className="text-center text-danger mt-5">
                                <p>Failed to load cities. Please refresh the page.</p>
                            </div>
                        ) : cities.length === 0 ? (
                            <div className="text-center text-muted mt-5">
                                <p>No cities available at the moment.</p>
                            </div>
                        ) : (
                            <div className="row">
                                {cities.map((city) => (
                                    <CityCard
                                        key={city.id}
                                        city={city}
                                        onClick={() => navigate(`/city/${city.id}`)}
                                    />
                                ))}
                            </div>
                        )}


                    </div>
                </div>
            </div>
            <footer className="footer text-center">
                <div className="container">
                    <span className="text-muted-small">
                        ©2025 EZStay. All rights reserved.
                    </span>
                </div>
            </footer>

        </>

    );
}

export default Home;
