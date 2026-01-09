import { useState, useEffect } from "react";
import API from "../services/api";
import { Modal, Button } from "react-bootstrap";


function Admin() {
    const [cityName, setCityName] = useState("");
    const [cityImage, setCityImage] = useState("");
    const [cities, setCities] = useState([]);
    const [stays, setStays] = useState([]);
    const [showConfirm, setShowConfirm] = useState(false);
    const [deleteType, setDeleteType] = useState(null); // "city" | "stay"
    const [deleteId, setDeleteId] = useState(null);



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

    const handleDeleteCity = async (id) => {
        try {
            const token = localStorage.getItem("token");

            await API.delete(`/cities/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            setCities((prev) => prev.filter((city) => city.id !== id));
        } catch (err) {
            alert("Failed to delete city");
        }
    };


    const handleDeleteStay = async (id) => {
        try {
            const token = localStorage.getItem("token");

            await API.delete(`/stays/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            // Update UI immediately
            setStays((prev) => prev.filter((stay) => stay.id !== id));
        } catch (err) {
            alert("Failed to delete stay");
        }
    };


    useEffect(() => {
        API.get("/cities")
            .then((res) => setCities(res.data))
            .catch(() => console.log("Error fetching cities"));

        API.get("/stays")
            .then((res) => setStays(res.data))
            .catch(() => console.log("Error fetching stays"));
    }, []);

    const openDeleteConfirm = (type, id) => {
        setDeleteType(type);
        setDeleteId(id);
        setShowConfirm(true);
    };

    const confirmDelete = async () => {
        try {
            const token = localStorage.getItem("token");

            if (deleteType === "stay") {
                await API.delete(`/stays/${deleteId}`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                setStays((prev) =>
                    prev.filter((stay) => stay.id !== deleteId)
                );
            }

            if (deleteType === "city") {
                await API.delete(`/cities/${deleteId}`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                setCities((prev) =>
                    prev.filter((city) => city.id !== deleteId)
                );
            }

            setShowConfirm(false);
            setDeleteType(null);
            setDeleteId(null);
        } catch (err) {
            alert("Delete failed");
        }
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

            <hr />
            <h6>Existing Cities</h6>

            {cities.length === 0 ? (
                <p className="text-muted">No cities available</p>
            ) : (
                <ul className="list-group mb-4">
                    {cities.map((city) => (
                        <li
                            key={city.id}
                            className="list-group-item d-flex justify-content-between align-items-center"
                        >
                            <span>{city.name}</span>

                            <button
                                className="btn btn-sm btn-danger"
                                onClick={() => openDeleteConfirm("city", city.id)}
                            >
                                Delete
                            </button>
                        </li>
                    ))}

                </ul>
            )}


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

            <hr />
            <h6>Existing Stays</h6>

            {stays.length === 0 ? (
                <p className="text-muted">No stays available</p>
            ) : (
                <ul className="list-group">
                    {stays.map((stay) => (
                        <li
                            key={stay.id}
                            className="list-group-item d-flex justify-content-between align-items-center"
                        >
                            <span>
                                {stay.title} — ₹{stay.price}
                            </span>

                            <button
                                className="btn btn-sm btn-danger"
                                onClick={() => openDeleteConfirm("stay", stay.id)}
                            >
                                Delete
                            </button>
                        </li>
                    ))}

                </ul>
            )}

            <Modal show={showConfirm} onHide={() => setShowConfirm(false)} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Confirm Delete</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <p>
                        Are you sure you want to delete this{" "}
                        <strong>{deleteType}</strong>?
                        This action cannot be undone.
                    </p>
                </Modal.Body>

                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowConfirm(false)}>
                        Cancel
                    </Button>
                    <Button variant="danger" onClick={confirmDelete}>
                        Delete
                    </Button>
                </Modal.Footer>
            </Modal>


        </div>
    );
}

export default Admin;
