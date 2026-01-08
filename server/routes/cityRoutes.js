const express = require("express");
const router = express.Router();

const {
    getCities,
    addCity
} = require("../controllers/cityController");

router.get("/", getCities);
router.post("/", addCity);

module.exports = router;
