const express = require("express");
const router = express.Router();
const { verifyToken, isAdmin } = require("../middleware/authMiddleware");

const {
    getCities,
    addCity
} = require("../controllers/cityController");

router.get("/", getCities);
router.post("/", addCity);
router.delete(
    "/:id",
    verifyToken,
    isAdmin,
    (req, res) => {
        const { id } = req.params;

        const query = "DELETE FROM cities WHERE id = ?";

        db.query(query, [id], (err, result) => {
            if (err) {
                return res.status(500).json({ message: "Delete failed" });
            }

            res.json({ message: "City deleted successfully" });
        });
    }
);


module.exports = router;
