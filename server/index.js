const express = require("express");
const cors = require("cors");
const authRoutes = require("./routes/authRoutes");
const cityRoutes = require("./routes/cityRoutes");
const stayRoutes = require("./routes/stayRoutes");

// DB connection (handles env loading internally)
require("./db/db");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/cities", cityRoutes);
app.use("/api/stays", stayRoutes);

// Test route
app.get("/", (req, res) => {
    res.send("EZStay Backend Running");
});

const PORT = 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
