import { Link, useNavigate } from "react-router-dom";

function Navbar({ user, onLogout }) {
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
                    {user ? (
                        <>
                            <span className="text-white me-3">
                                Hi, {user.name}
                            </span>
                            <button
                                className="btn btn-outline-light btn-sm"
                                onClick={handleLogout}
                            >
                                Logout
                            </button>
                        </>
                    ) : (
                        <span className="text-white">Guest</span>
                    )}
                </div>
            </div>
        </nav>
    );
}

export default Navbar;
