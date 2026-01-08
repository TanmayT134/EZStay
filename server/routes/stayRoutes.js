const express = require("express");
const router = express.Router();

const {
    addStay,
    getStaysByCity,
} = require("../controllers/stayController");

// Add stay
router.post("/", addStay);

// Get stays by city
router.get("/city/:cityId", getStaysByCity);

module.exports = router;
