import { useState } from "react";
import API from "../services/api";

function SignupForm({ onSignupSuccess }) {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");

        try {
            await API.post("/auth/register", {
                name,
                email,
                password,
            });

            onSignupSuccess();
        } catch (err) {
            setError(err.response?.data?.message || "Signup failed");
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            {error && <p className="text-danger">{error}</p>}

            <input
                className="form-control mb-2"
                placeholder="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
            />

            <input
                className="form-control mb-2"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />

            <input
                type="password"
                className="form-control mb-3"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />

            <button className="btn btn-primary w-100">Sign Up</button>
        </form>
    );
}

export default SignupForm;
