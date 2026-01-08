import { useState } from "react";
import API from "../services/api";

function Admin() {
    const [cityName, setCityName] = useState("");
    const [cityImage, setCityImage] = useState("");

    const [stay, setStay] = useState({
        city_id: "",
        title: "",
        price: "",
        description: "",
        image_url: "",
    });

    const addCity = (e) => {
        e.preventDefault();
        API.post("/cities", { name: cityName, image_url: cityImage })
            .then(() => {
                alert("City added");
                setCityName("");
                setCityImage("");
            })
            .catch(() => alert("Error adding city"));
    };

    const addStay = (e) => {
        e.preventDefault();
        API.post("/stays", stay)
            .then(() => {
                alert("Stay added");
                setStay({
                    city_id: "",
                    title: "",
                    price: "",
                    description: "",
                    image_url: "",
                });
            })
            .catch(() => alert("Error adding stay"));
    };

    return (
        <div className="card p-4 mb-4">
            <h4>Admin Panel</h4>

            {/* Add City */}
            <form onSubmit={addCity} className="mb-4">
                <h6>Add City</h6>
                <input
                    className="form-control mb-2"
                    placeholder="City Name"
                    value={cityName}
                    onChange={(e) => setCityName(e.target.value)}
                    required
                />
                <input
                    className="form-control mb-2"
                    placeholder="City Image URL"
                    value={cityImage}
                    onChange={(e) => setCityImage(e.target.value)}
                />
                <button className="btn btn-primary">Add City</button>
            </form>

            {/* Add Stay */}
            <form onSubmit={addStay}>
                <h6>Add Stay</h6>
                <input
                    className="form-control mb-2"
                    placeholder="City ID"
                    value={stay.city_id}
                    onChange={(e) =>
                        setStay({ ...stay, city_id: e.target.value })
                    }
                    required
                />
                <input
                    className="form-control mb-2"
                    placeholder="Title"
                    value={stay.title}
                    onChange={(e) =>
                        setStay({ ...stay, title: e.target.value })
                    }
                    required
                />
                <input
                    className="form-control mb-2"
                    placeholder="Price"
                    value={stay.price}
                    onChange={(e) =>
                        setStay({ ...stay, price: e.target.value })
                    }
                    required
                />
                <input
                    className="form-control mb-2"
                    placeholder="Description"
                    value={stay.description}
                    onChange={(e) =>
                        setStay({ ...stay, description: e.target.value })
                    }
                />
                <input
                    className="form-control mb-2"
                    placeholder="Image URL"
                    value={stay.image_url}
                    onChange={(e) =>
                        setStay({ ...stay, image_url: e.target.value })
                    }
                />
                <button className="btn btn-success">Add Stay</button>
            </form>
        </div>
    );
}

export default Admin;
