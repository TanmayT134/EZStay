import { useState } from "react";
import API from "../services/api";

function LoginForm({ onLoginSuccess }) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");

        try {
            const res = await API.post("/auth/login", {
                email,
                password,
            });

            localStorage.setItem("token", res.data.token);
            localStorage.setItem("user", JSON.stringify(res.data.user));

            onLoginSuccess(res.data.user);
        } catch (err) {
            setError(err.response?.data?.message || "Login failed");
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            {error && <p className="text-danger">{error}</p>}

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

            <button className="btn btn-warning w-100">Login</button>
        </form>
    );
}

export default LoginForm;
