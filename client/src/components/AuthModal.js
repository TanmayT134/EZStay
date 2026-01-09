import LoginForm from "./LoginForm";
import SignupForm from "./SignupForm";
import { Modal, Button } from "react-bootstrap";

function AuthModal({ show, onClose, mode, setMode, onLoginSuccess }) {
    return (
        <Modal show={show} onHide={onClose} centered>
            <Modal.Header closeButton>
                <Modal.Title>
                    {mode === "login" ? "Login" : "Sign Up"}
                </Modal.Title>
            </Modal.Header>

            <Modal.Body className="px-4">
                {mode === "login" ? (
                    <>
                        <LoginForm onLoginSuccess={onLoginSuccess} />

                        <p className="mt-3">
                            Don’t have an account?{" "}
                            <span className="text-primary fw-bold" role="button"
                                style={{ color: "blue", cursor: "pointer" }}
                                onClick={() => setMode("signup")}
                            >
                                Sign up
                            </span>
                        </p>
                    </>
                ) : (
                    <>
                        <SignupForm
                            onSignupSuccess={() => {
                                setMode("login");
                            }}
                        />
                        <p className="mt-3">
                            Already have an account?{" "}
                            <span className="text-primary fw-bold" role="button"
                                style={{ color: "blue", cursor: "pointer" }}
                                onClick={() => setMode("login")}
                            >
                                Login
                            </span>
                        </p>
                    </>
                )}
            </Modal.Body>

            <Modal.Footer>
                <Button variant="secondary" onClick={onClose}>
                    Close
                </Button>
            </Modal.Footer>
        </Modal>
    );
}

export default AuthModal;
