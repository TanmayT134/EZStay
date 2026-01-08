const db = require("../db/db");

/**
 * ADD STAY
 */
exports.addStay = (req, res) => {
    const { city_id, title, price, description, image_url } = req.body;

    if (!city_id || !title || !price) {
        return res.status(400).json({
            message: "city_id, title and price are required",
        });
    }

    const query = `
    INSERT INTO stays (city_id, title, price, description, image_url)
    VALUES (?, ?, ?, ?, ?)
  `;

    db.query(
        query,
        [city_id, title, price, description, image_url],
        (err, result) => {
            if (err) return res.status(500).json(err);

            res.status(201).json({
                message: "Stay added successfully",
            });
        }
    );
};

/**
 * GET STAYS BY CITY
 */
exports.getStaysByCity = (req, res) => {
    const cityId = req.params.cityId;

    const query = `
    SELECT s.*, c.name AS city_name
    FROM stays s
    JOIN cities c ON s.city_id = c.id
    WHERE c.id = ?
  `;

    db.query(query, [cityId], (err, result) => {
        if (err) return res.status(500).json(err);

        res.json(result);
    });
};

/**
 * GET STAY BY ID
 */
exports.getStayById = (req, res) => {
    const stayId = req.params.id;

    const query = `
    SELECT s.*, c.name AS city_name
    FROM stays s
    JOIN cities c ON s.city_id = c.id
    WHERE s.id = ?
  `;

    db.query(query, [stayId], (err, result) => {
        if (err) return res.status(500).json(err);

        if (result.length === 0) {
            return res.status(404).json({ message: "Stay not found" });
        }

        res.json(result[0]);
    });
};
