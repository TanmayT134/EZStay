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
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <div className="container">
                <Link className="navbar-brand" to="/">
                    EZStay
                </Link>

                <div className="ms-auto">
                    {!user ? (
                        <>
                            <button
                                className="btn btn-outline-primary me-2"
                                onClick={() => {
                                    setAuthMode("login");
                                    setShowAuthModal(true);
                                }}
                            >
                                Login
                            </button>

                            <button
                                className="btn btn-primary"
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
