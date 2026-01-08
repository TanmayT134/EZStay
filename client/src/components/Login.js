import { useState } from "react";
import API from "../services/api";

function Login({ onLogin }) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();

        API.post("/auth/login", { email, password })
            .then((res) => {
                localStorage.setItem("token", res.data.token);
                onLogin(res.data.user);
            })
            .catch(() => {
                setError("Invalid email or password");
            });
    };

    return (
        <div className="card p-4 mb-4">
            <h4 className="mb-3">Login</h4>

            {error && <p className="text-danger">{error}</p>}

            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <input
                        type="email"
                        className="form-control"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>

                <div className="mb-3">
                    <input
                        type="password"
                        className="form-control"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>

                <button className="btn btn-primary w-100">Login</button>
            </form>
        </div>
    );
}

export default Login;
