const db = require("../db/db");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

/**
 * REGISTER USER
 */
exports.register = (req, res) => {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
        return res.status(400).json({ message: "All fields are required" });
    }

    // Check if user already exists
    const checkQuery = "SELECT * FROM users WHERE email = ?";
    db.query(checkQuery, [email], (err, result) => {
        if (err) return res.status(500).json(err);

        if (result.length > 0) {
            return res.status(400).json({ message: "User already exists" });
        }

        // Hash password
        const hashedPassword = bcrypt.hashSync(password, 10);

        const insertQuery =
            "INSERT INTO users (name, email, password) VALUES (?, ?, ?)";

        db.query(
            insertQuery,
            [name, email, hashedPassword],
            (err, result) => {
                if (err) return res.status(500).json(err);

                res.status(201).json({ message: "User registered successfully" });
            }
        );
    });
};

/**
 * LOGIN USER
 */
exports.login = (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ message: "All fields are required" });
    }

    const query = "SELECT * FROM users WHERE email = ?";
    db.query(query, [email], (err, result) => {
        if (err) return res.status(500).json(err);

        if (result.length === 0) {
            return res.status(400).json({ message: "Invalid credentials" });
        }

        const user = result[0];

        const isMatch = bcrypt.compareSync(password, user.password);

        if (!isMatch) {
            return res.status(400).json({ message: "Invalid credentials" });
        }

        const token = jwt.sign(
            { id: user.id, role: user.role },
            process.env.JWT_SECRET,
            { expiresIn: "1d" }
        );

        res.json({
            message: "Login successful",
            token,
            user: {
                id: user.id,
                name: user.name,
                email: user.email,
                role: user.role,
            },
        });
    });
};
