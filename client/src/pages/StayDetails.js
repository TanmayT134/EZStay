import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import API from "../services/api";

function StayDetails() {
    const { id } = useParams();
    const [stay, setStay] = useState(null);

    useEffect(() => {
        console.log("Fetching stay ID:", id);

        API.get(`/stays/${id}`)
            .then((res) => {
                console.log("Stay data:", res.data);
                setStay(res.data);
            })
            .catch((err) => {
                console.error("Error fetching stay:", err);
            });
    }, [id]);


    if (!stay) {
        return <p className="container mt-4">Loading...</p>;
    }

    return (
        <div className="bg-light min-vh-100">
            <div className="container mt-4">
                <h2>{stay.title}</h2>
                <p className="text-muted">{stay.city_name}</p>

                <h4>₹{stay.price} / night</h4>

                <p className="mt-3">{stay.description}</p>

                {stay.image_url && (
                    <img
                        src={stay.image_url}
                        alt={stay.title}
                        className="img-fluid mt-3"
                    />
                )}
            </div>
        </div>

    );
}

export default StayDetails;
