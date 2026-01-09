import { Link, useNavigate } from "react-router-dom";

function Navbar({ user, onLogout, setShowAuthModal, setAuthMode }) {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        onLogout();
        navigate("/");
    };

    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light shadow-sm">
            <div className="container">
                <Link className="navbar-brand fw-bold text-dark" to="/">
                    EZ<span className="text-brand">Stay</span>
                </Link>

                <div className="ms-auto">
                    {!user ? (
                        <>
                            <button
                                className="btn btn-warning me-2"
                                onClick={() => {
                                    setAuthMode("login");
                                    setShowAuthModal(true);
                                }}
                            >
                                Login
                            </button>

                            <button
                                className="btn btn-warning"
                                onClick={() => {
                                    setAuthMode("signup");
                                    setShowAuthModal(true);
                                }}
                            >
                                Sign Up
                            </button>
                        </>
                    ) : (
                        <>
                            <span className="me-3">Hi, {user.name}</span>
                            <button className="btn btn-danger" onClick={onLogout}>
                                Logout
                            </button>
                        </>
                    )}

                </div>
            </div>
        </nav>
    );
}

export default Navbar;
