import axios from "axios";

const API = axios.create({
    baseURL: "https://ezstay-backend.onrender.com/api",
});

export default API;
