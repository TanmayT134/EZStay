const express = require("express");
const router = express.Router();
const db = require("../db/db");
const { verifyToken, isAdmin } = require("../middleware/authMiddleware");

const {
    addStay,
    getStaysByCity,
    getStayById
} = require("../controllers/stayController");


// Add stay
router.post("/", addStay);

// Get stays by city
router.get("/city/:cityId", getStaysByCity);
router.get("/:id", getStayById);

router.delete(
    "/:id",
    verifyToken,
    isAdmin,
    (req, res) => {
        const { id } = req.params;

        const query = "DELETE FROM stays WHERE id = ?";

        db.query(query, [id], (err, result) => {
            if (err) {
                return res.status(500).json({ message: "Delete failed" });
            }

            res.json({ message: "Stay deleted successfully" });
        });
    }
);


module.exports = router;
