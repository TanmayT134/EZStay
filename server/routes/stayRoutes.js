const express = require("express");
const router = express.Router();

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


module.exports = router;
