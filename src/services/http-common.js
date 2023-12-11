import axios from "axios";

export default axios.create({
  baseURL: process.env.REACT_API_BASE_URL || "http://localhost:3000/",
  headers: {
    "Content-Type": "application/json",
  },
});