const db = require("../db/db");

/**
 * GET ALL CITIES
 */
exports.getCities = (req, res) => {
    const query = "SELECT * FROM cities";

    db.query(query, (err, result) => {
        if (err) return res.status(500).json(err);
        res.json(result);
    });
};

/**
 * ADD CITY (ADMIN)
 */
exports.addCity = (req, res) => {
    const { name, image_url } = req.body;

    if (!name) {
        return res.status(400).json({ message: "City name is required" });
    }

    const query = "INSERT INTO cities (name, image_url) VALUES (?, ?)";

    db.query(query, [name, image_url], (err, result) => {
        if (err) return res.status(500).json(err);

        res.status(201).json({
            message: "City added successfully",
        });
    });
};
